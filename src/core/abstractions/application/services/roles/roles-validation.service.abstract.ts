import { z } from 'zod';
import { Either } from '@/shared/either';

import { IRolesValidationService } from '@/core/interfaces/application/services/roles/roles-validation.service.interface';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';
import { IUpdateRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/update-role-repository.dto.interface';

import { IReadRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';
import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/create-role-repository.dto.abstract';
import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/read-role-repository.dto.abstract';
import { AbstractUpdateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/update-role-repository.dto.abstract';
import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';
import { AbstractValidationService } from '@/core/abstractions/@base/validation-service.abstract';
import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/delete-role-repository.dto.abstract';
import { IDeleteRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/delete-role-repository.dto.interface';
import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/search-roles-repository.dto.abstract';
import { ISearchRolesRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/search-roles-repository.dto.interface';

export abstract class AbstractRolesValidationService
  extends AbstractValidationService
  implements IRolesValidationService
{
  public abstract validateCreateRoleSchema(
    dto: AbstractCreateRoleRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractCreateRoleRepositoryDto
  >;

  public abstract validateReadRoleSchema(
    dto: AbstractReadRoleRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IReadRoleRepositoryDto
  >;

  public abstract validateUpdateRoleSchema(
    dto: AbstractUpdateRoleRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IUpdateRoleRepositoryDto
  >;

  public abstract validateDeleteRoleRepositoryDtoSchema(
    dto: AbstractDeleteRoleRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IDeleteRoleRepositoryDto
  >;

  public abstract validateSearchRolesRepositoryDtoSchema(
    dto: AbstractSearchRolesRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ISearchRolesRepositoryDto
  >;

  public abstract validateCreateRole(
    dto: AbstractCreateRoleRepositoryDto,
  ): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleAlreadyExistError,
      AbstractCreateRoleRepositoryDto
    >
  >;

  public abstract validateUpdateRole(
    dto: AbstractUpdateRoleRepositoryDto,
  ): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleAlreadyExistError,
      IUpdateRoleRepositoryDto
    >
  >;

  public abstract validateDeleteRole(
    dto: AbstractDeleteRoleRepositoryDto,
  ): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | RoleNotFoundError
      | InternalServerError,
      IDeleteRoleRepositoryDto
    >
  >;

  public abstract validateRolesExists(
    roles: Array<{
      id?: RolesModel['id'];
      name?: RolesModel['name'];
    }>,
  ): Promise<
    Either<
      InternalServerError,
      | {
          exists: false;
          nonExistentRoles: Array<{
            id?: RolesModel['id'];
            name?: RolesModel['name'];
          }>;
        }
      | { exists: true }
    >
  >;
}
