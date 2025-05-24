import { Either } from '@/shared/either';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { IUserRoleRepositoryDto } from '../dtos/repositories/user-roles/user-role-repository.dto.interface';
import { CreateUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/create-user-role-repository.dto';
import { DeleteUserRoleUseCaseDto } from '@/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto';
import { SearchUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/search-user-role-repository.dto';

export interface IUserRolesRepositoryService {
  createUserRole(
    dto: CreateUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, IUserRoleRepositoryDto>>;

  deleteUserRole(
    dto: DeleteUserRoleUseCaseDto,
  ): Promise<Either<InternalServerError, boolean>>;

  searchUserRole(
    dto: SearchUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, IUserRoleRepositoryDto[]>>;
}
