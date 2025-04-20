import { IDeleteUserRoleUseCase } from '@/core/interfaces/application/use-cases/user-roles/delete-user-role.use-case.interface';

import { AbstractUseCase } from '@/core/abstractions/@base/use-case.abstract';
import { AbstractDeleteUserRoleUseCaseDto } from '../../dtos/use-cases/user-roles/delete-user-role.use-case.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleDoesNotExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleDoesNotExistError.error';
export abstract class AbstractDeleteUserRoleUseCase
  extends AbstractUseCase
  implements IDeleteUserRoleUseCase
{
  public abstract execute(dto: AbstractDeleteUserRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleDoesNotExistError,
      boolean
    >
  >;
}
