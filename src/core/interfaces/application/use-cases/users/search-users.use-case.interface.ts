import { AbstractSearchUsersRepositoryResultDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository-result.dto.abstract';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';

export interface ISearchUsersUseCase {
  execute(dto: AbstractSearchUsersRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractSearchUsersRepositoryResultDto
    >
  >;
}
