import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { IUserRolesRepositoryService } from '@/core/interfaces/infrastructure/repositories/user-roles.repository.service.interface';
import { Either } from '@/shared/either';
import { AbstractCreateUserRoleRepositoryDto } from '../dtos/repositories/user-roles/create-user-role.dto.abstract';
import { AbstractUserRoleRepositoryDto } from '../dtos/repositories/user-roles/user-role-repository.dto.abstract';
import { AbstractSearchUserRoleRepositoryDto } from '../dtos/repositories/user-roles/search-user-role.dto.abstract';
import { AbstractDeleteUserRoleUseCaseDto } from '../../application/dtos/use-cases/user-roles/delete-user-role.use-case.dto.abstract';

export abstract class AbstractUserRolesRepositoryService
  implements IUserRolesRepositoryService
{
  public abstract createUserRole(
    dto: AbstractCreateUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractUserRoleRepositoryDto>>;

  public abstract deleteUserRole(
    dto: AbstractDeleteUserRoleUseCaseDto,
  ): Promise<Either<InternalServerError, boolean>>;

  public abstract searchUserRole(
    dto: AbstractSearchUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractUserRoleRepositoryDto[]>>;
}
