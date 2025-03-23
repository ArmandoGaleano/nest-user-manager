import { Either } from '@/shared/either';
import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';
import { AbstractCreateUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/create-user-repository.dto.abstract';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/update-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/delete-user-repository.dto.abstract';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/dtos/repositories/users/search-users-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { CreateUserRepositoryError } from '@/core/errors/repository/users/CreateUserRepositoryError.error';

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
  ): Promise<Either<InternalServerError, AbstractUserRepositoryDto[]>>;
}
