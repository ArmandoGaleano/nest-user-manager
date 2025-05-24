import { Either } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleDoesNotExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleDoesNotExistError.error';
import { DeleteUserRoleUseCaseDto } from '@/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto';

export interface IDeleteUserRoleUseCase {
  execute(dto: DeleteUserRoleUseCaseDto): Promise<
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
