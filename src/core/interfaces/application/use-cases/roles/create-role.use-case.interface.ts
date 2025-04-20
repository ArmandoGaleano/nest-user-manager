import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/create-role-repository.dto.abstract';
import { AbstractRoleEntity } from '@/core/abstractions/domain/entities/role.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';

export interface ICreateRoleUseCase {
  execute(dto: AbstractCreateRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleAlreadyExistError,
      AbstractRoleEntity
    >
  >;
}
