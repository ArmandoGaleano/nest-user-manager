import { AbstractCreateUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/create-user-role.dto.abstract';
import { AbstractSearchUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/search-user-role.dto.abstract';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { Either } from '@/shared/either';

export interface IUserRolesRepositoryService {
  createUserRole(
    dto: AbstractCreateUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractUserRoleRepositoryDto>>;

  searchUserRole(
    dto: AbstractSearchUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractUserRoleRepositoryDto[]>>;
}
