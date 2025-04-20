import { ISearchUserRoleUseCase } from '@/core/interfaces/application/use-cases/user-roles/search-user-role.use-case.interface';

import { AbstractUseCase } from '@/core/abstractions/@base/use-case.abstract';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.abstract';
import { AbstractSearchUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/search-user-role.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
export abstract class AbstractSearchUserRoleUseCase
  extends AbstractUseCase
  implements ISearchUserRoleUseCase
{
  public abstract execute(dto: AbstractSearchUserRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractUserRoleRepositoryDto[]
    >
  >;
}
