import { z } from 'zod';
import { Either } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';

import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
import { IUpdateRoleRepositoryDto } from '../../../infrastructure/dtos/repositories/roles/update-role-repository.dto.interface';

import { IReadRoleRepositoryDto } from '../../../infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';
import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';

import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/create-role-repository.dto.abstract';
import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/read-role-repository.dto.abstract';
import { AbstractUpdateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/update-role-repository.dto.abstract';
import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';
import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/delete-role-repository.dto.abstract';
import { IDeleteRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/delete-role-repository.dto.interface';
import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/search-roles-repository.dto.abstract';
import { ISearchRolesRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/search-roles-repository.dto.interface';

export interface IRolesValidationService {
  validateCreateRoleSchema(dto: AbstractCreateRoleRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractCreateRoleRepositoryDto
  >;

  validateReadRoleSchema(dto: AbstractReadRoleRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IReadRoleRepositoryDto
  >;

  validateUpdateRoleSchema(dto: AbstractUpdateRoleRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IUpdateRoleRepositoryDto
  >;

  validateDeleteRoleRepositoryDtoSchema(
    dto: AbstractDeleteRoleRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IDeleteRoleRepositoryDto
  >;

  validateSearchRolesRepositoryDtoSchema(
    dto: AbstractSearchRolesRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ISearchRolesRepositoryDto
  >;

  validateCreateRole(dto: AbstractCreateRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | RoleAlreadyExistError
      | InternalServerError,
      AbstractCreateRoleRepositoryDto
    >
  >;

  validateUpdateRole(dto: AbstractUpdateRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleAlreadyExistError,
      IUpdateRoleRepositoryDto
    >
  >;

  validateDeleteRole(dto: AbstractDeleteRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | RoleNotFoundError
      | InternalServerError,
      IDeleteRoleRepositoryDto
    >
  >;

  validateRolesExists(
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
