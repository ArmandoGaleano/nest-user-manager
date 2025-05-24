import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { SearchUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/search-user-role-repository.dto';
import { UserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/user-role-repository.dto';

export interface ISearchUserRoleUseCase {
  execute(dto: SearchUserRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      UserRoleRepositoryDto[]
    >
  >;
}
