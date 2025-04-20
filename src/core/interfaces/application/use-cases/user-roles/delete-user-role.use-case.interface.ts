import { AbstractDeleteUserRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleDoesNotExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleDoesNotExistError.error';

export interface IDeleteUserRoleUseCase {
  execute(dto: AbstractDeleteUserRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleDoesNotExistError,
      boolean
    >
  >;
}
