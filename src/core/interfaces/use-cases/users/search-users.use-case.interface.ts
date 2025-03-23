import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/dtos/repositories/users/search-users-repository.dto.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';
import { Either } from '@/shared/either';

export interface ISearchUsersUseCase {
  execute: (
    dto: AbstractSearchUsersRepositoryDto,
  ) => Promise<Either<Error, AbstractUserRepositoryDto[]>>;
}
