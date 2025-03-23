import { AbstractCreateUserRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/user-roles/create-user-role.dto.abstract';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/user-roles/user-role-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { Either } from '@/shared/either';

export interface IUserRolesRepositoryService {
  createUserRole(
    dto: AbstractCreateUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractUserRoleRepositoryDto>>;
}
