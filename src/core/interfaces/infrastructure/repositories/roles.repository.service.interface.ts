import { Either } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/create-role-repository.dto.abstract';
import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/read-role-repository.dto.abstract';
import { AbstractUpdateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/update-role-repository.dto.abstract';
import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/delete-role-repository.dto.abstract';
import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/search-roles-repository.dto.abstract';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/role-repository.dto.abstract';

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
