import { AbstractCreateUserRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.abstract';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleDoesNotExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleDoesNotExistError.error';
import { UserRoleAlreadyExistError } from '@/core/errors/application/services/user-roles/roles-validation-service/UserRoleAlreadyExistError.error';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';
export interface ICreateUserRoleUseCase {
  execute(dto: AbstractCreateUserRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleDoesNotExistError
      | UserRoleAlreadyExistError
      | UserDoesNotExistsError,
      AbstractUserRoleRepositoryDto
    >
  >;
}
