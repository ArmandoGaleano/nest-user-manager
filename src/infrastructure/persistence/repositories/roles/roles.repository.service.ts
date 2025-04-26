import { Injectable } from '@nestjs/common';

import { knex } from '@/infrastructure/persistence/knex/knex';
import { Either, Left, left, right } from '@/shared/either';

import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';

import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';

import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/create-role-repository.dto.abstract';
import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/read-role-repository.dto.abstract';
import { AbstractUpdateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/update-role-repository.dto.abstract';
import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/delete-role-repository.dto.abstract';
import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/search-roles-repository.dto.abstract';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/role-repository.dto.abstract';
import { RoleDto } from '@/infrastructure/dtos/persistence/repositories/roles/role-repository.dto';

import { RolesModel } from '../../database-models/roles.model';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
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
        .returning<RolesModel[]>('*');

      if (createRoleSuccess?.[0]?.id?.length) {
        return right(new RoleDto(createRoleSuccess?.[0]));
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
        .where((query) => {
          if (dto.id) {
            query.where('id', dto.id);
          }
          if (dto.name) {
            if (!dto.enableExactSearch) {
              query.whereRaw('"roles"."name" ILIKE ?', [
                `%${dto.name.replace(/[%_]/g, '\\$&')}%`,
              ]);
            }

            if (dto.enableExactSearch) {
              query.where('name', dto.name);
            }
          }
          if (dto.createdAt) {
            query.where('users.createdAt', dto.createdAt);
          }
          if (dto.createdAtStart) {
            query.where('users.createdAt', '>=', dto.createdAtStart);
          }
          if (dto.createdAtEnd) {
            query.where('users.createdAt', '<=', dto.createdAtEnd);
          }
          if (dto.updatedAt) {
            query.where('users.updatedAt', dto.updatedAt);
          }
          if (dto.updatedAtStart) {
            query.where('users.updatedAt', '>=', dto.updatedAtStart);
          }
          if (dto.updatedAtEnd) {
            query.where('users.updatedAt', '<=', dto.updatedAtEnd);
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
