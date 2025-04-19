import { Injectable } from '@nestjs/common';

import { AbstractUseCase } from '@/core/abstractions/@base/use-case.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { IDeleteRoleUseCase } from '@/core/interfaces/application/use-cases/roles/delete-role.use-case.interface';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/delete-role-repository.dto.abstract';

@Injectable()
export abstract class AbstractDeleteRoleUseCase
  extends AbstractUseCase
  implements IDeleteRoleUseCase
{
  public abstract execute(dto: AbstractDeleteRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | RoleNotFoundError
      | InternalServerError,
      boolean
    >
  >;
}
