import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/role-repository.dto';
export interface IUpdateRoleUseCase {
  execute(dto: IUpdateRoleUseCase): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      RoleRepositoryDto
    >
  >;
}
