import { AbstractReadUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/user-repository.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';

export interface IReadUserUseCase {
  execute(dto: AbstractReadUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractUserRepositoryDto | undefined
    >
  >;
}
