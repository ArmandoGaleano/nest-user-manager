import { AbstractSearchUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/search-user-role.dto.abstract';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { Either } from '@/shared/either';
import { z } from 'zod';

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
