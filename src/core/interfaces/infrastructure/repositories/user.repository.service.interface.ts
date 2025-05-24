import { Either } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { CreateUserRepositoryError } from '@/core/errors/repositories/users/CreateUserRepositoryError.error';
import { CreateUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/create-user-repository.dto';
import { UserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/user-repository.dto';
import { ReadUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/read-user-repository.dto';
import { UpdateUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/update-user-repository.dto';
import { DeleteUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/delete-user-repository.dto';
import { SearchUsersRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository.dto';
import { SearchUsersRepositoryResultDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository-result.dto';

export interface IUsersRepositoryService {
  createUser(
    dto: CreateUserRepositoryDto,
  ): Promise<
    Either<InternalServerError | CreateUserRepositoryError, UserRepositoryDto>
  >;
  readUser(
    dto: ReadUserRepositoryDto,
  ): Promise<Either<InternalServerError, UserRepositoryDto | undefined>>;
  updateUser(
    dto: UpdateUserRepositoryDto,
  ): Promise<Either<InternalServerError, UserRepositoryDto>>;
  deleteUser(
    dto: DeleteUserRepositoryDto,
  ): Promise<Either<InternalServerError, boolean>>;

  searchUsers(
    dto: SearchUsersRepositoryDto,
  ): Promise<Either<InternalServerError, SearchUsersRepositoryResultDto>>;
}
