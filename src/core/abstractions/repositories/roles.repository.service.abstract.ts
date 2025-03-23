import { IRolesRepositoryService } from '@/core/interfaces/repositories/roles.repository.service.interface';

import type { Either } from '@/shared/either';
import { AbstractRoleRepositoryDto } from '../dtos/repositories/roles/role-repository.dto.abstract';
import { AbstractCreateRoleRepositoryDto } from '../dtos/repositories/roles/create-role-repository.dto.abstract';
import { AbstractReadRoleRepositoryDto } from '../dtos/repositories/roles/read-role-repository.dto.abstract';
import { AbstractUpdateRoleRepositoryDto } from '../dtos/repositories/roles/update-role-repository.dto.abstract';
import { AbstractDeleteRoleRepositoryDto } from '../dtos/repositories/roles/delete-role-repository.dto.abstract';
import { AbstractSearchRolesRepositoryDto } from '../dtos/repositories/roles/search-roles-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';

export abstract class AbstractRolesRepositoryService
  implements IRolesRepositoryService
{
  abstract createRole(
    dto: AbstractCreateRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractRoleRepositoryDto>>;

  abstract readRole(
    dto: AbstractReadRoleRepositoryDto,
  ): Promise<
    Either<InternalServerError, AbstractRoleRepositoryDto | undefined>
  >;

  abstract updateRole(
    dto: AbstractUpdateRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractRoleRepositoryDto>>;

  abstract deleteRole(
    dto: AbstractDeleteRoleRepositoryDto,
  ): Promise<Either<InternalServerError, boolean>>;

  abstract searchRoles(
    dto: AbstractSearchRolesRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractRoleRepositoryDto[]>>;
}
