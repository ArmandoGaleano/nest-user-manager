import { Injectable } from '@nestjs/common';

import { ISearchRoleUseCase } from '@/core/interfaces/application/use-cases/roles/search-role.use-case.interface';

import { AbstractUseCase } from '@/core/abstractions/@base/use-case.abstract';
import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/search-roles-repository.dto.abstract';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/role-repository.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
@Injectable()
export abstract class AbstractSearchRoleUseCase
  extends AbstractUseCase
  implements ISearchRoleUseCase
{
  public abstract execute(dto: AbstractSearchRolesRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractRoleRepositoryDto[]
    >
  >;
}
