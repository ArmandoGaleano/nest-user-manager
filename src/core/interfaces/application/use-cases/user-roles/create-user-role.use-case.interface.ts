import { AbstractCreateUserRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.abstract';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.abstract';
import { RoleDoesNotExist } from '@/core/errors/application/services/roles/roles-validation-service/RoleDoesNotExist.error';
import { UserRoleAlreadyExistError } from '@/core/errors/application/services/user-roles/roles-validation-service/UserRoleAlreadyExistError.error';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { Either } from '@/shared/either';
import { z } from 'zod';

export interface ICreateUserRoleUseCase {
  execute(dto: AbstractCreateUserRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleDoesNotExist
      | UserRoleAlreadyExistError
      | UserDoesNotExistsError,
      AbstractUserRoleRepositoryDto
    >
  >;
}
