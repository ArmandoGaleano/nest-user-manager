import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/delete-role-repository.dto.abstract';

import { z } from 'zod';
import { Either } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
export interface IDeleteRoleUseCase {
  execute(dto: AbstractDeleteRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | RoleNotFoundError
      | InternalServerError,
      boolean
    >
  >;
}
