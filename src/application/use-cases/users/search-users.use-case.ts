import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/dtos/repositories/users/search-users-repository.dto.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';
import { AbstractUsersRepositoryService } from '@/core/abstractions/repositories/users.repository.service.abstract';
import { AbstractSearchUsersUseCase } from '@/core/abstractions/use-cases/users/search-users.use-case.abstract';
import { Either } from '@/shared/either';

export class SearchUsersUseCase extends AbstractSearchUsersUseCase {
  constructor(private UsersRepositoryService: AbstractUsersRepositoryService) {
    super();
  }

  async execute(
    dto: AbstractSearchUsersRepositoryDto,
  ): Promise<Either<Error, AbstractUserRepositoryDto[]>> {
    const users = await this.UsersRepositoryService.searchUsers(dto);

    
  }
}
