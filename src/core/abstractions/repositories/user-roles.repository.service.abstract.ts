import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { IUserRolesRepositoryService } from '@/core/interfaces/repositories/user-roles.repository.service.interface';
import { Either } from '@/shared/either';
import { AbstractCreateUserRoleRepositoryDto } from '../dtos/repositories/user-roles/create-user-role.dto.abstract';
import { AbstractUserRoleRepositoryDto } from '../dtos/repositories/user-roles/user-role-repository.dto.abstract';

export abstract class AbstractUserRolesRepositoryService
  implements IUserRolesRepositoryService
{
  public abstract createUserRole(
    dto: AbstractCreateUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractUserRoleRepositoryDto>>;
}
