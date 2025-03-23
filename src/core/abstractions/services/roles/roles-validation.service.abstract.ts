import { z } from 'zod';
import { Either } from '@/shared/either';

import { IRolesValidationService } from '@/core/interfaces/services/roles/roles-validation.service.interface';
import { AbstractCreateRoleRepositoryDto } from '../../dtos/repositories/roles/create-role-repository.dto.abstract';
import { AbstractRoleRepositoryDto } from '../../dtos/repositories/roles/role-repository.dto.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleNotFoundError } from '@/core/errors/services/roles/roles-validation-service/RoleNotFoundError.error';
import { RoleAlreadyExistError } from '@/core/errors/services/roles/roles-validation-service/RoleAlreadyExistError.error';

export abstract class AbstractRolesValidationService
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

  public abstract validateRolesExists(
    roles: Array<RolesModel['name']>,
  ): Promise<
    Either<InternalServerError | RoleNotFoundError, AbstractRoleRepositoryDto[]>
  >;
}
