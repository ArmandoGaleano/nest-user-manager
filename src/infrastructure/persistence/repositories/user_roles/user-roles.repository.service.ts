import { Injectable } from '@nestjs/common';

import { knex } from '@/infrastructure/persistence/knex/knex';
import { Either, left, right } from '@/shared/either';

import { UserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/user-role-repository.dto';

import { UserRolesModel } from '../../database-models/user_roles.model';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { IUserRolesRepositoryService } from '@/core/interfaces/infrastructure/repositories/user-roles.repository.service.interface';
import { IUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.interface';

import { SearchUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/search-user-role-repository.dto';
import { DeleteUserRoleUseCaseDto } from '@/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto';
import { CreateUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/create-user-role-repository.dto';
@Injectable()
export class UserRolesRepositoryService implements IUserRolesRepositoryService {
  constructor() {}

  public async createUserRole(
    dto: CreateUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, IUserRoleRepositoryDto>> {
    try {
      const userRole = await knex<UserRolesModel>('user_roles')
        .insert({
          user_id: dto.user_id,
          role_id: dto.role_id,
          createdAt: dto.createdAt,
          updatedAt: dto.updatedAt,
        })
        .returning<UserRolesModel[]>('*');

      if (!userRole?.[0]?.user_id?.length || !userRole?.[0]?.role_id?.length) {
        throw new InternalServerError();
      }

      return right(new UserRoleRepositoryDto(userRole[0]));
    } catch (error) {
      console.error('UserRolesRepositoryService error: createUserRoles');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public async deleteUserRole(
    dto: DeleteUserRoleUseCaseDto,
  ): Promise<Either<InternalServerError, boolean>> {
    try {
      const userRoleDeleted = await knex<UserRolesModel>('user_roles')
        .where({
          user_id: dto.user_id,
          role_id: dto.role_id,
        })
        .del();

      return right(userRoleDeleted > 0);
    } catch (error) {
      console.error('UserRolesRepositoryService error: deleteUserRoles');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public async searchUserRole(
    dto: SearchUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, IUserRoleRepositoryDto[]>> {
    try {
      const limit = dto.limit ? Math.min(dto.limit, 100) : 10;
      const page = dto.page && dto.page > 0 ? dto.page : 1;
      const offset = (page - 1) * limit;

      const query = knex<UserRolesModel>('user_roles').select(
        'user_id',
        'role_id',
        'createdAt',
        'updatedAt',
      );

      if (dto.user_id) {
        query.where('user_id', dto.user_id);
      }

      if (dto.role_id) {
        query.where('role_id', dto.role_id);
      }

      if (dto.createdAt) {
        query.where('createdAt', dto.createdAt);
      }
      if (dto.createdAtStart) {
        query.where('createdAt', '>=', dto.createdAtStart);
      }
      if (dto.createdAtEnd) {
        query.where('createdAt', '<=', dto.createdAtEnd);
      }
      if (dto.updatedAt) {
        query.where('updatedAt', dto.updatedAt);
      }
      if (dto.updatedAtStart) {
        query.where('updatedAt', '>=', dto.updatedAtStart);
      }
      if (dto.updatedAtEnd) {
        query.where('updatedAt', '<=', dto.updatedAtEnd);
      }

      // Ordenação por data de criação, do mais recente para o mais antigo
      query.orderBy('createdAt', 'desc');

      // Aplica paginação
      query.limit(limit).offset(offset);

      const searchRoles = await query;

      return right(
        searchRoles.map((userRole) => new UserRoleRepositoryDto(userRole)),
      );
    } catch (error) {
      console.error('UserRolesRepositoryService error: searchUserRole');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
