import { AbstractUseCase } from '../../base/use-case.abstract';
import { ISearchUsersUseCase } from '@/core/interfaces/use-cases/users/search-users.use-case.interface';

import { AbstractSearchUsersRepositoryDto } from '../../dtos/repositories/users/search-users-repository.dto.abstract';

import { Either } from '@/shared/either';
import { AbstractUserRepositoryDto } from '../../dtos/repositories/users/user-repository.dto.abstract';

export abstract class AbstractSearchUsersUseCase
  extends AbstractUseCase
  implements ISearchUsersUseCase
{
  abstract execute: (
    dto: AbstractSearchUsersRepositoryDto,
  ) => Promise<Either<Error, AbstractUserRepositoryDto[]>>;
}
