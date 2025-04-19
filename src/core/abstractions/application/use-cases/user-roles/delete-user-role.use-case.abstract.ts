import { Either } from '@/shared/either';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { z } from 'zod';
import { AbstractUseCase } from '@/core/abstractions/@base/use-case.abstract';
import { AbstractDeleteUserRoleUseCaseDto } from '../../dtos/use-cases/user-roles/delete-user-role.use-case.dto.abstract';
import { UserRoleDoesNotExistError } from '@/core/errors/application/services/user-roles/roles-validation-service/UserRoleDoesNotExistError.error';
import { IDeleteUserRoleUseCase } from '@/core/interfaces/application/use-cases/user-roles/delete-user-role.use-case.interface';

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
      | UserRoleDoesNotExistError,
      boolean
    >
  >;
}
