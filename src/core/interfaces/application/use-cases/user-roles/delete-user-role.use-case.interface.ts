import { AbstractDeleteUserRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto.abstract';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.abstract';

import { UserRoleDoesNotExistError } from '@/core/errors/application/services/user-roles/roles-validation-service/UserRoleDoesNotExistError.error';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { Either } from '@/shared/either';
import { z } from 'zod';

export interface IDeleteUserRoleUseCase {
  execute(dto: AbstractDeleteUserRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserRoleDoesNotExistError,
      boolean
    >
  >;
}
