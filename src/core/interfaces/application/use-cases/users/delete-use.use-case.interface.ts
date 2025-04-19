import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/delete-user-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { Either } from '@/shared/either';
import { z } from 'zod';

export interface IValidateUpdateUser {
  id: UsersModel['id'];
}

export interface IDeleteUserUseCase {
  execute(dto: AbstractDeleteUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      boolean
    >
  >;
}
