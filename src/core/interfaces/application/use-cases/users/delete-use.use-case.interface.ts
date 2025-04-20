import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/delete-user-repository.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';

export interface IValidateUpdateUser {
  id: UsersModel['id'];
}

export interface IDeleteUserUseCase {
  execute(dto: AbstractDeleteUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserDoesNotExistsError,
      boolean
    >
  >;
}
