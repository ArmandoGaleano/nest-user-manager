import { AbstractUseCase } from '../../base/use-case.abstract';
import { ISearchUsersUseCase } from '@/core/interfaces/use-cases/users/search-users.use-case.interface';

import { AbstractSearchUsersRepositoryDto } from '../../dtos/repositories/users/search-users-repository.dto.abstract';

import { Either } from '@/shared/either';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { z } from 'zod';
import { AbstractSearchUsersRepositoryResultDto } from '../../dtos/repositories/users/search-users-repository-result.dto.abstract';

export abstract class AbstractSearchUsersUseCase
  extends AbstractUseCase
  implements ISearchUsersUseCase
{
  abstract execute(dto: AbstractSearchUsersRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractSearchUsersRepositoryResultDto[]
    >
  >;
}
