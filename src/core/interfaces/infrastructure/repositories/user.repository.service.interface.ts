import { AbstractCreateUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/create-user-repository.dto.abstract';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/update-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/delete-user-repository.dto.abstract';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository.dto.abstract';
import { AbstractSearchUsersRepositoryResultDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository-result.dto.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/user-repository.dto.abstract';

import { Either } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { CreateUserRepositoryError } from '@/core/errors/repositories/users/CreateUserRepositoryError.error';

export interface IUsersRepositoryService {
  createUser(
    dto: AbstractCreateUserRepositoryDto,
  ): Promise<
    Either<
      InternalServerError | CreateUserRepositoryError,
      AbstractUserRepositoryDto
    >
  >;
  readUser(
    dto: AbstractReadUserRepositoryDto,
  ): Promise<
    Either<InternalServerError, AbstractUserRepositoryDto | undefined>
  >;
  updateUser(
    dto: AbstractUpdateUserRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractUserRepositoryDto>>;
  deleteUser(
    dto: AbstractDeleteUserRepositoryDto,
  ): Promise<Either<InternalServerError, boolean>>;

  searchUsers(
    dto: AbstractSearchUsersRepositoryDto,
  ): Promise<
    Either<InternalServerError, AbstractSearchUsersRepositoryResultDto>
  >;
}
