import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { UpdateUserRepositoryError } from '@/core/errors/repositories/users/UpdateUserRepositoryError.error';
import { UpdateUserUseCaseDto } from '@/application/dtos/use-cases/users/update-user-use-case.dto';
import { UserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/user-repository.dto';

export interface IUpdateUserUseCase {
  execute(dto: UpdateUserUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError
      | UpdateUserRepositoryError,
      UserRepositoryDto
    >
  >;
}
