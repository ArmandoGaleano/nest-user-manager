import { AbstractValidationService } from '@/core/abstractions/@base/validation-service.abstract';
import { ICreateUserRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.interface';
import { ISearchUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/search-user-role-repository.dto.interface';

import { ICreateUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/create-user-role-repository.dto.interface';
import { IDeleteUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/delete-user-role-repository.dto.interface';
import { IUserRolesValidationService } from '@/core/interfaces/application/services/user-roles/user-roles-validation.service.interface';

import { AbstractCreateUserRoleUseCaseDto } from '../../dtos/use-cases/user-roles/create-user-role-use-case.dto.abstract';
import { AbstractCreateUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/create-user-role.dto.abstract';
import { AbstractDeleteUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/delete-user-role.dto.abstract';
import { AbstractSearchUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/search-user-role.dto.abstract';

import { UserRolesModel } from '@/infrastructure/persistence/database-models/user_roles.model';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
export abstract class AbstractUserRolesValidationService
  extends AbstractValidationService
  implements IUserRolesValidationService
{
  abstract validateCreateUserRoleUseCaseDto(
    dto: AbstractCreateUserRoleUseCaseDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    ICreateUserRoleUseCaseDto
  >;

  abstract validateCreateUserRoleRepositorySchema(
    dto: AbstractCreateUserRoleRepositoryDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    ICreateUserRoleRepositoryDto
  >;

  abstract validateDeleteUserRoleRepositorySchema(
    dto: AbstractDeleteUserRoleRepositoryDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    IDeleteUserRoleRepositoryDto
  >;

  abstract validateSearchUserRoleRepositoryDtoSchema(
    dot: AbstractSearchUserRoleRepositoryDto,
  ): Either<
    | InternalServerError
    | z.ZodError<{
        [x: string]: any;
      }>,
    ISearchUserRoleRepositoryDto
  >;

  abstract validateUserRoleExists(
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
