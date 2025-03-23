import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { AbstractCreateUserUseCaseDto } from '@/core/abstractions/dtos/use-cases/users/create-user-use-case.dto.abstract';

import { z } from 'zod';
import { Either } from '@/shared/either';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleNotFoundError } from '@/core/errors/services/roles/roles-validation-service/RoleNotFoundError.error';
import { AbstractUserEntity } from '@/core/abstractions/entities/user.abstract';

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
