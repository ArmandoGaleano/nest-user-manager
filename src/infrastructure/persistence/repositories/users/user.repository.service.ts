import { Injectable } from '@nestjs/common';

import { knex } from '@/infrastructure/persistence/knex';
import { Either, left, right } from '@/shared/either';

import { AbstractUsersRepositoryService } from '@/core/abstractions/infrastructure/repositories/users.repository.service.abstract';
import { AbstractCreateUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/create-user-repository.dto.abstract';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/update-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/delete-user-repository.dto.abstract';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository.dto.abstract';
import { AbstractSearchUsersRepositoryResultDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository-result.dto.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/user-repository.dto.abstract';
import { UserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/user-repository.dto';
import { SearchUsersRepositoryResultDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository-result.dto';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { CreateUserRepositoryError } from '@/core/errors/repositories/users/CreateUserRepositoryError.error';
import { UpdateUserRepositoryError } from '@/core/errors/repositories/users/UpdateUserRepositoryError.error';
@Injectable()
export class UsersRepositoryService extends AbstractUsersRepositoryService {
  constructor() {
    super();
  }

  public async createUser(
    dto: AbstractCreateUserRepositoryDto,
  ): Promise<
    Either<
      InternalServerError | CreateUserRepositoryError,
      AbstractUserRepositoryDto
    >
  > {
    try {
      const user = await knex<UsersModel>('users')
        .insert({
          id: dto.id,
          email: dto.email,
          password: dto.password,
          firstName: dto.firstName,
          lastName: dto.lastName,
          birthdate: dto.birthdate,
          document: dto.document,
          documentType: dto.documentType,
          createdAt: dto.createdAt,
          updatedAt: dto.updatedAt,
        })
        .returning('*');

      if (!user?.[0]?.id?.length) {
        return left(new CreateUserRepositoryError());
      }

      return right(new UserRepositoryDto(user[0]));
    } catch (error) {
      console.error('UserRepositoryService error: createUser');
      console.error(error);

      return left(new InternalServerError());
    }
  }
  public async readUser(
    dto: AbstractReadUserRepositoryDto,
  ): Promise<
    Either<InternalServerError, AbstractUserRepositoryDto | undefined>
  > {
    try {
      const query = knex<UsersModel>('users');

      if (dto.id) {
        query.where('id', dto.id);
      }

      if (dto.email) {
        query.andWhere('email', dto.email);
      }

      const user = await query.first();

      if (!user?.id?.length) {
        return right(undefined);
      }

      return right(new UserRepositoryDto(user));
    } catch (error) {
      console.error('UserRepositoryService error: readUser');
      console.error(error);

      return left(new InternalServerError());
    }
  }
  public async updateUser(
    dto: AbstractUpdateUserRepositoryDto,
  ): Promise<
    Either<
      InternalServerError | UpdateUserRepositoryError,
      AbstractUserRepositoryDto
    >
  > {
    try {
      const user = await knex<UsersModel>('users')
        .where('id', dto.id)
        .update({
          ...Object.entries(dto).reduce((acc, [key, value]) => {
            if (key !== 'id') {
              acc[key] = value;
            }

            return acc;
          }, {} as Partial<UsersModel>),
        })
        .returning('*');

      if (!user?.[0]?.id?.length) {
        return left(new UpdateUserRepositoryError());
      }

      return right(new UserRepositoryDto(user[0]));
    } catch (error) {
      console.error('UserRepositoryService error: updateUser');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public async deleteUser(
    dto: AbstractDeleteUserRepositoryDto,
  ): Promise<Either<InternalServerError, boolean>> {
    try {
      const deleteSuccess = !!(await knex<UsersModel>('users')
        .where('id', dto.id)
        .delete());

      return right(deleteSuccess);
    } catch (error) {
      console.error('UserRepositoryService error: deleteUser');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public async searchUsers(
    dto: AbstractSearchUsersRepositoryDto,
  ): Promise<
    Either<InternalServerError, AbstractSearchUsersRepositoryResultDto>
  > {
    try {
      const limit = dto.limit ? Math.min(dto.limit, 100) : 10;
      const page = dto.page && dto.page > 0 ? dto.page : 1;
      const offset = (page - 1) * limit;

      const query = knex<Array<Omit<UsersModel, 'password'>>>('users').select(
        'id',
        'email',
        'firstName',
        'lastName',
        'birthdate',
        'document',
        'documentType',
        'createdAt',
        'updatedAt',
      );

      // Filtros na tabela de users
      if (dto.id) {
        query.where('users.id', dto.id);
      }
      if (dto.email) {
        query.where('users.email', dto.email);
      }

      if (dto.firstName) {
        query.whereRaw('"users"."firstName" ILIKE ?', [
          `%${dto.firstName.replace(/[%_]/g, '\\$&')}%`,
        ]);
      }
      if (dto.lastName) {
        query.whereRaw('"users"."lastName" ILIKE ?', [
          `%${dto.lastName.replace(/[%_]/g, '\\$&')}%`,
        ]);
      }
      if (dto.birthdate) {
        query.whereRaw(
          `TO_DATE(users.birthdate, 'DD/MM/YYYY') = TO_DATE(?, 'DD/MM/YYYY')`,
          [dto.birthdate],
        );
      }
      if (dto.document) {
        query.where('users.document', dto.document);
      }
      if (dto.documentType) {
        query.where('users.documentType', dto.documentType);
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
      // Filtro por roles, se informado
      if (dto.roles && Array.isArray(dto.roles) && dto.roles.length > 0) {
        const rolesSubquery = knex('roles')
          .select('id')
          .whereIn('name', dto.roles);
        const userRolesSubquery = knex('user_roles')
          .select('user_id')
          .whereIn('role_id', rolesSubquery);
        query.whereIn('users.id', userRolesSubquery);
      }

      // Ordenação por data de criação, do mais recente para o mais antigo
      query.orderBy('users.createdAt', 'desc');

      // Aplica paginação
      query.limit(limit).offset(offset);

      const users: Array<Omit<UsersModel, 'password'>> = await query;

      return right(
        new SearchUsersRepositoryResultDto({
          data: users.map((user) => new UserRepositoryDto(user)),
          page,
          limit,
          total: users.length,
        }),
      );
    } catch (error) {
      console.error('UserRepositoryService error: searchUsers', error);
      return left(new InternalServerError());
    }
  }
}
