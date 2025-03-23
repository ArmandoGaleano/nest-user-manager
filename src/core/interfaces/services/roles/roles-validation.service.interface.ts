import { z } from 'zod';
import { Either } from '@/shared/either';

import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/create-role-repository.dto.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleAlreadyExistError } from '@/core/errors/services/roles/roles-validation-service/RoleAlreadyExistError.error';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/role-repository.dto.abstract';
import { RoleNotFoundError } from '@/core/errors/services/roles/roles-validation-service/RoleNotFoundError.error';

export interface IRolesValidationService {
  validateCreateRoleSchema(dto: AbstractCreateRoleRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractCreateRoleRepositoryDto
  >;

  validateCreateRole(dto: AbstractCreateRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractCreateRoleRepositoryDto
    >
  >;

  validateRolesExists(
    roles: Array<RolesModel['name']>,
  ): Promise<
    Either<InternalServerError | RoleNotFoundError, AbstractRoleRepositoryDto[]>
  >;
}
