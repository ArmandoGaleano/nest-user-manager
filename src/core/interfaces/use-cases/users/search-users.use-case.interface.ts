import { AbstractSearchUsersRepositoryResultDto } from '@/core/abstractions/dtos/repositories/users/search-users-repository-result.dto.abstract';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/dtos/repositories/users/search-users-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { Either } from '@/shared/either';
import { z } from 'zod';

export interface ISearchUsersUseCase {
  execute(dto: AbstractSearchUsersRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractSearchUsersRepositoryResultDto[]
    >
  >;
}
