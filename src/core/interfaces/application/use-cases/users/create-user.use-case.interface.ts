import { AbstractCreateUserUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/users/create-user-use-case.dto.abstract';
import { AbstractUserEntity } from '@/core/abstractions/domain/entities/user.abstract';

import { z } from 'zod';
import { Either } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';

export interface ICreateUserUseCase {
  execute(dto: AbstractCreateUserUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError
      | RoleNotFoundError,
      AbstractUserEntity
    >
  >;
}
