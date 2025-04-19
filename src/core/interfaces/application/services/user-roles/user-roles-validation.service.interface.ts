import { AbstractCreateUserRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.abstract';
import { AbstractCreateUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/create-user-role.dto.abstract';
import { AbstractDeleteUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/delete-user-role.dto.abstract';
import { AbstractSearchUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/search-user-role.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { ICreateUserRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.interface';
import { ICreateUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/create-user-role-repository.dto.interface';
import { IDeleteUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/delete-user-role-repository.dto.interface';
import { ISearchUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/search-user-role-repository.dto.interface';
import { UserRolesModel } from '@/infrastructure/persistence/database-models/user_roles.model';
import { Either } from '@/shared/either';
import { z } from 'zod';

export interface IUserRolesValidationService {
  validateCreateUserRoleUseCaseDto(
    dto: AbstractCreateUserRoleUseCaseDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ICreateUserRoleUseCaseDto
  >;

  validateCreateUserRoleRepositorySchema(
    dto: AbstractCreateUserRoleRepositoryDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    ICreateUserRoleRepositoryDto
  >;

  validateDeleteUserRoleRepositorySchema(
    dto: AbstractDeleteUserRoleRepositoryDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    IDeleteUserRoleRepositoryDto
  >;

  validateSearchUserRoleRepositoryDtoSchema(
    dot: AbstractSearchUserRoleRepositoryDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    ISearchUserRoleRepositoryDto
  >;

  validateUserRoleExists(
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
  >;
}
