import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/search-roles-repository.dto.abstract';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/role-repository.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
export interface ISearchRoleUseCase {
  execute(dto: AbstractSearchRolesRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractRoleRepositoryDto[]
    >
  >;
}
