import type { Either } from '@/shared/either';
import { IUsersRepositoryService } from '@/core/interfaces/repositories/user.repository.service.interface';
import { AbstractUserRepositoryDto } from '../dtos/repositories/users/user-repository.dto.abstract';
import { AbstractCreateUserRepositoryDto } from '../dtos/repositories/users/create-user-repository.dto.abstract';
import { AbstractReadUserRepositoryDto } from '../dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUpdateUserRepositoryDto } from '../dtos/repositories/users/update-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '../dtos/repositories/users/delete-user-repository.dto.abstract';
import { AbstractSearchUsersRepositoryDto } from '../dtos/repositories/users/search-users-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { CreateUserRepositoryError } from '@/core/errors/repository/users/CreateUserRepositoryError.error';
import { UpdateUserRepositoryError } from '@/core/errors/repository/users/UpdateUserRepositoryError.error';
import { AbstractSearchUsersRepositoryResultDto } from '../dtos/repositories/users/search-users-repository-result.dto.abstract';

export abstract class AbstractUsersRepositoryService
  implements IUsersRepositoryService
{
  abstract createUser(
    dto: AbstractCreateUserRepositoryDto,
  ): Promise<
    Either<
      InternalServerError | CreateUserRepositoryError,
      AbstractUserRepositoryDto
    >
  >;
  abstract readUser(
    dto: AbstractReadUserRepositoryDto,
  ): Promise<
    Either<InternalServerError, AbstractUserRepositoryDto | undefined>
  >;
  abstract updateUser(
    dto: AbstractUpdateUserRepositoryDto,
  ): Promise<
    Either<
      InternalServerError | UpdateUserRepositoryError,
      AbstractUserRepositoryDto
    >
  >;
  abstract deleteUser(
    dto: AbstractDeleteUserRepositoryDto,
  ): Promise<Either<InternalServerError, boolean>>;

  abstract searchUsers(
    dto: AbstractSearchUsersRepositoryDto,
  ): Promise<
    Either<InternalServerError, AbstractSearchUsersRepositoryResultDto[]>
  >;
}
