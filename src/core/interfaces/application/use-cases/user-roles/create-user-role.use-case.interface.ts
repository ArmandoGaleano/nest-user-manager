import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleDoesNotExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleDoesNotExistError.error';
import { UserRoleAlreadyExistError } from '@/core/errors/application/services/user-roles/roles-validation-service/UserRoleAlreadyExistError.error';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';
import { CreateUserRoleUseCaseDto } from '@/application/dtos/use-cases/user-roles/create-user-role.use-case.dto';
import { UserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/user-role-repository.dto';
export interface ICreateUserRoleUseCase {
  execute(dto: CreateUserRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleDoesNotExistError
      | UserRoleAlreadyExistError
      | UserDoesNotExistsError,
      UserRoleRepositoryDto
    >
  >;
}
