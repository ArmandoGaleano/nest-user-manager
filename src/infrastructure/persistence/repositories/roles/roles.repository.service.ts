import { Injectable } from '@nestjs/common';
import { knex } from '@/infrastructure/persistence/knex/knex';

import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';
import { RoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/role-repository.dto';

import { IRolesRepositoryService } from '@/core/interfaces/infrastructure/repositories/roles.repository.service.interface';
import { Either, left, right } from '@/shared/either';
import { RolesModel } from '../../database-models/roles.model';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { SearchRolesRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/search-roles-repository.dto';
@Injectable()
export class RolesRepositoryService implements IRolesRepositoryService {
  constructor() {}

  public async readRole(
    dto: ReadRoleRepositoryDto,
  ): Promise<Either<InternalServerError, RoleRepositoryDto | undefined>> {
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
          new RoleRepositoryDto({
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

  public async searchRoles(
    dto: SearchRolesRepositoryDto,
  ): Promise<Either<InternalServerError, RoleRepositoryDto[]>> {
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

      return right(roles.map((role) => new RoleRepositoryDto(role)));
    } catch (error) {
      console.error('RoleRepositoryService error: searchRoles');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
