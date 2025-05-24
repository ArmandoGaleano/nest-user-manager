import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { ReadUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/read-user-repository.dto';
import { UserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/user-repository.dto';

export interface IReadUserUseCase {
  execute(dto: ReadUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      UserRepositoryDto | undefined
    >
  >;
}
