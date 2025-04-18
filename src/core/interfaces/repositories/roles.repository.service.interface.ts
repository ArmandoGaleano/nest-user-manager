import { Either } from '@/shared/either';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/role-repository.dto.abstract';
import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/create-role-repository.dto.abstract';
import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/read-role-repository.dto.abstract';
import { AbstractUpdateRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/update-role-repository.dto.abstract';
import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/delete-role-repository.dto.abstract';
import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/search-roles-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';

export interface IRolesRepositoryService {
  createRole(
    dto: AbstractCreateRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractRoleRepositoryDto>>;
  readRole(
    dto: AbstractReadRoleRepositoryDto,
  ): Promise<
    Either<InternalServerError, AbstractRoleRepositoryDto | undefined>
  >;

  updateRole(
    dto: AbstractUpdateRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractRoleRepositoryDto>>;

  deleteRole(
    dto: AbstractDeleteRoleRepositoryDto,
  ): Promise<Either<InternalServerError, boolean>>;

  searchRoles(
    dto: AbstractSearchRolesRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractRoleRepositoryDto[]>>;
}
