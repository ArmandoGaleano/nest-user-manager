import { Injectable } from '@nestjs/common';
import { AbstractRolesRepositoryService } from '@/core/abstractions/repositories/roles.repository.service.abstract';
import { Either, Left, left, right } from '@/shared/either';
import { knex } from '@/infrastructure/persistence/knex';

import { AbstractRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/role-repository.dto.abstract';
import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/create-role-repository.dto.abstract';
import { RoleDto } from '@/core/dtos/repositories/roles/role-repository.dto';
import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/read-role-repository.dto.abstract';
import { AbstractUpdateRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/update-role-repository.dto.abstract';
import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/delete-role-repository.dto.abstract';
import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/search-roles-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { ReadRoleRepositoryDto } from '@/core/dtos/repositories/roles/read-role-repository.dto';

@Injectable()
export class RolesRepositoryService extends AbstractRolesRepositoryService {
  constructor() {
    super();
  }

  public async createRole(
    dto: AbstractCreateRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractRoleRepositoryDto>> {
    try {
      const createRoleSuccess = await knex('roles')
        .insert({
          id: dto.id,
          name: dto.name,
          description: dto.description,
          createdAt: dto.createdAt,
          updatedAt: dto.updatedAt,
        })
        .returning<UsersModel[]>('*');

      if (createRoleSuccess?.[0]?.id?.length) {
        return right(new RoleDto(dto));
      }

      return left(new InternalServerError());
    } catch (error) {
      console.error('RoleRepositoryService error: createRole');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public async readRole(
    dto: AbstractReadRoleRepositoryDto,
  ): Promise<
    Either<InternalServerError, AbstractRoleRepositoryDto | undefined>
  > {
    try {
      if (!dto?.id?.trim()?.length && !dto?.name?.trim()?.length) {
        return right(undefined);
      }

      const role = await knex<Pick<RolesModel, 'id' | 'name'>, RolesModel[]>(
        'roles',
      )
        .where((builder) => {
          if (dto?.id?.trim()?.length && dto?.name?.trim()?.length) {
            builder.where('id', dto.id).andWhere('name', dto.name);
          }

          if (dto.id) {
            builder.orWhere('id', dto.id);
          }
          if (dto.name) {
            builder.orWhere('name', dto.name);
          }
        })
        .first();

      if (role) {
        return right(
          new RoleDto({
            id: role.id,
            name: role.name,
            description: role.description,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
          }),
        );
      }

      return right(undefined);
    } catch (error) {
      console.error('RoleRepositoryService error: readRole');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public async updateRole(
    dto: AbstractUpdateRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractRoleRepositoryDto>> {
    try {
      const updateRoleSuccess = !!(await knex('roles')
        .where('id', dto.id)
        .update({
          name: dto.name,
          description: dto.description,
          updatedAt: dto.updatedAt,
        }));

      if (updateRoleSuccess) {
        const eitherRoleUpdated = await this.readRole(
          new ReadRoleRepositoryDto({ id: dto.id }),
        );

        if (eitherRoleUpdated instanceof Left) {
          return left(new InternalServerError());
        }

        const roleUpdated = eitherRoleUpdated.value;

        if (!roleUpdated?.id?.length) {
          return left(new InternalServerError());
        }

        return right(roleUpdated);
      }

      return left(new InternalServerError());
    } catch (error) {
      console.error('RoleRepositoryService error: updateRole');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public async deleteRole(
    dto: AbstractDeleteRoleRepositoryDto,
  ): Promise<Either<InternalServerError, boolean>> {
    try {
      const deleteRoleSuccess = !!(await knex('roles')
        .where('id', dto.id)
        .del());

      if (deleteRoleSuccess) {
        return right(true);
      }

      return left(new InternalServerError());
    } catch (error) {
      console.error('RoleRepositoryService error: deleteRole');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public async searchRoles(
    dto: AbstractSearchRolesRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractRoleRepositoryDto[]>> {
    try {
      const limit = dto.limit ? Math.min(dto.limit, 100) : 10;
      const page = dto.page && dto.page > 0 ? dto.page : 1;
      const offset = (page - 1) * limit;

      const roles = await knex<
        Pick<RolesModel, 'id' | 'name' | 'createdAt' | 'updatedAt'>,
        RolesModel[]
      >('roles')
        .where((builder) => {
          if (dto.id) {
            builder.where('id', dto.id);
          }
          if (dto.name) {
            builder.where('name', dto.name);
          }
          if (dto.createdAt) {
            builder.where('createdAt', dto.createdAt);
          }
          if (dto.updatedAt) {
            builder.where('updatedAt', dto.updatedAt);
          }
        })
        .limit(limit)
        .offset(offset);

      return right(roles.map((role) => new RoleDto(role)));
    } catch (error) {
      console.error('RoleRepositoryService error: searchRoles');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
