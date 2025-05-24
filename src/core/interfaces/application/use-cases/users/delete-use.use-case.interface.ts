import { Either } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';
import { UsersModel } from '@/infrastructure/persistence/database-models/users.model';
import { DeleteUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/delete-user-repository.dto';

export interface IValidateUpdateUser {
  id: UsersModel['id'];
}

export interface IDeleteUserUseCase {
  execute(dto: DeleteUserRepositoryDto): Promise<
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
