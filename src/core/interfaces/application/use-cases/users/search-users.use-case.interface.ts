import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { SearchUsersRepositoryResultDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository-result.dto';
import { SearchUsersRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository.dto';

export interface ISearchUsersUseCase {
  execute(dto: SearchUsersRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      SearchUsersRepositoryResultDto
    >
  >;
}
