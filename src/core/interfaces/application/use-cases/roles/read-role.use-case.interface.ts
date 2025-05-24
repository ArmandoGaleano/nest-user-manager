import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';
import { RoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/role-repository.dto';
export interface IReadRoleUseCase {
  execute(dto: ReadRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      RoleRepositoryDto | undefined
    >
  >;
}
