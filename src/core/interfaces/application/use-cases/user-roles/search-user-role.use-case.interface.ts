import { AbstractSearchUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/search-user-role.dto.abstract';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';

export interface ISearchUserRoleUseCase {
  execute(dto: AbstractSearchUserRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractUserRoleRepositoryDto[]
    >
  >;
}
