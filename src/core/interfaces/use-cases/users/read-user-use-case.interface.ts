import { AbstractReadUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { Either } from '@/shared/either';
import { z } from 'zod';

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
