import { Either } from '@/shared/either';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';
import { RoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/role-repository.dto';
import { SearchRolesRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/search-roles-repository.dto';

export interface IRolesRepositoryService {
  readRole(
    dto: ReadRoleRepositoryDto,
  ): Promise<Either<InternalServerError, RoleRepositoryDto | undefined>>;

  searchRoles(
    dto: SearchRolesRepositoryDto,
  ): Promise<Either<InternalServerError, RoleRepositoryDto[]>>;
}
