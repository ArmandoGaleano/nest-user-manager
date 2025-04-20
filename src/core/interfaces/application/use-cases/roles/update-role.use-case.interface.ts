import { AbstractUpdateRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/roles/update-role-use-case.dto.abstract';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/role-repository.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
export interface IUpdateRoleUseCase {
  execute(dto: AbstractUpdateRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractRoleRepositoryDto
    >
  >;
}
