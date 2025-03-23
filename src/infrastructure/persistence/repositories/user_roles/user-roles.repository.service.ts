import { Injectable } from '@nestjs/common';
import { AbstractUserRolesRepositoryService } from '@/core/abstractions/repositories/user-roles.repository.service.abstract';

import { Either, left, right } from '@/shared/either';
import { knex } from '@/infrastructure/persistence/knex';
import { UserRolesModel } from '../../database-models/user_roles.model';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/user-roles/user-role-repository.dto.abstract';
import { AbstractCreateUserRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/user-roles/create-user-role.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';

@Injectable()
export class UserRolesRepositoryService extends AbstractUserRolesRepositoryService {
  constructor() {
    super();
  }

  public async createUserRole(
    dto: AbstractCreateUserRoleRepositoryDto,
  ): Promise<Either<InternalServerError, AbstractUserRoleRepositoryDto>> {
    try {
      console.log({dto})
      const userRole = await knex<UserRolesModel>('user_roles')
        .insert({
          user_id: dto.user_id,
          role_id: dto.role_id,
          createdAt: dto.createdAt,
          updatedAt: dto.updatedAt,
        })
        .returning<UserRolesModel[]>('*');

      if (!userRole?.[0]?.user_id?.length || !userRole?.[0]?.role_id?.length) {
        throw new InternalServerError();
      }

      return right(userRole[0]);
    } catch (error) {
      console.error('UserRolesRepositoryService error: createUserRoles');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
