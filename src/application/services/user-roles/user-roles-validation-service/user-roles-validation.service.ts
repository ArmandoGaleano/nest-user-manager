import { Injectable } from '@nestjs/common';

import { AbstractUserRolesValidationService } from '@/core/abstractions/application/services/user-roles/user-roles-validation.service.abstract';

import { AbstractUserRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/user-roles.repository.service.abstract';

import { ICreateUserRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.interface';
import { ICreateUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/create-user-role-repository.dto.interface';
import { IDeleteUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/delete-user-role-repository.dto.interface';
import { ISearchUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/search-user-role-repository.dto.interface';

import { AbstractCreateUserRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.abstract';
import { AbstractCreateUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/create-user-role.dto.abstract';
import { AbstractDeleteUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/delete-user-role.dto.abstract';
import { AbstractSearchUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/search-user-role.dto.abstract';

import { SearchUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/search-user-role-repository.dto';

import { CreateUserRoleUseCaseSchema } from './schemas/use-cases/create-user-role-use-case.schema';
import { CreateUserRoleRepositorySchema } from './schemas/repository/create-user-role-repository.schema';
import { DeleteUserRoleRepositorySchema } from './schemas/repository/delete-user-role-repository.schema';
import { SearchUserRoleRepositorySchema } from './schemas/repository/search-user-role-repository.schema';

import { UserRolesModel } from '@/infrastructure/persistence/database-models/user_roles.model';

import { Either, Left, left, right } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
@Injectable()
export class UserRolesValidationService extends AbstractUserRolesValidationService {
  constructor(
    private readonly UserRolesRepositoryService: AbstractUserRolesRepositoryService,
  ) {
    super();
  }

  validateCreateUserRoleUseCaseDto(
    dto: AbstractCreateUserRoleUseCaseDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    ICreateUserRoleUseCaseDto
  > {
    return this.validateDtoSchema<ICreateUserRoleUseCaseDto>({
      currentMethodName: 'validateCreateUserRoleUseCaseDto',
      zodSchema: new CreateUserRoleUseCaseSchema(),
      dto,
    });
  }

  validateCreateUserRoleRepositorySchema(
    dto: AbstractCreateUserRoleRepositoryDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    ICreateUserRoleRepositoryDto
  > {
    return this.validateDtoSchema<ICreateUserRoleRepositoryDto>({
      currentMethodName: 'validateCreateUserRoleRepositorySchema',
      zodSchema: new CreateUserRoleRepositorySchema(),
      dto,
    });
  }

  validateDeleteUserRoleRepositorySchema(
    dto: AbstractDeleteUserRoleRepositoryDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    IDeleteUserRoleRepositoryDto
  > {
    return this.validateDtoSchema<IDeleteUserRoleRepositoryDto>({
      currentMethodName: 'validateDeleteUserRoleRepositorySchema',
      zodSchema: new DeleteUserRoleRepositorySchema(),
      dto,
    });
  }

  validateSearchUserRoleRepositoryDtoSchema(
    dot: AbstractSearchUserRoleRepositoryDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    ISearchUserRoleRepositoryDto
  > {
    return this.validateDtoSchema<ISearchUserRoleRepositoryDto>({
      currentMethodName: 'validateSearchUserRoleRepositoryDtoSchema',
      zodSchema: new SearchUserRoleRepositorySchema(),
      dto: dot,
    });
  }

  async validateUserRoleExists(
    userRoles: Array<{
      user_id: UserRolesModel['user_id'];
      role_id: UserRolesModel['role_id'];
    }>,
  ): Promise<
    Either<
      InternalServerError,
      | {
          exists: false;
          nonExistentUserRoles: Array<{
            user_id: UserRolesModel['user_id'];
            role_id: UserRolesModel['role_id'];
          }>;
        }
      | { exists: true }
    >
  > {
    try {
      if (
        userRoles.some(
          (userRole) =>
            !userRole?.user_id?.length || !userRole?.role_id?.length,
        )
      ) {
        throw new Error('User ID and Role ID are required');
      }

      const userRoleExistsPromises = userRoles.map(
        async ({ user_id, role_id }) => {
          const eitherSearchUserRole =
            await this.UserRolesRepositoryService.searchUserRole(
              new SearchUserRoleRepositoryDto({
                user_id,
                role_id,
              }),
            );

          if (eitherSearchUserRole instanceof Left) {
            throw eitherSearchUserRole.value;
          }

          if (eitherSearchUserRole.value.length) {
            return true;
          }

          return false;
        },
      );

      const userRoleExists = await Promise.all(userRoleExistsPromises);

      if (userRoleExists.some((exists) => exists === false)) {
        const nonExistentUserRoles = userRoles.filter(
          (_, index) => !userRoleExists[index],
        );

        return right({
          exists: false,
          nonExistentUserRoles,
        });
      }

      return right({ exists: true });
    } catch (error) {
      console.error('UserRolesValidationService.validateUserRoleExists');
      console.error(error);
      return left(new InternalServerError());
    }
  }
}
