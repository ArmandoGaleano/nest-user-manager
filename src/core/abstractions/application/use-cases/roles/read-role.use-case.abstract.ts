import { Injectable } from '@nestjs/common';

import { IReadRoleUseCase } from '@/core/interfaces/application/use-cases/roles/read-role.use-case.interface';

import { AbstractUseCase } from '@/core/abstractions/@base/use-case.abstract';
import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/read-role-repository.dto.abstract';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/role-repository.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';

@Injectable()
export abstract class AbstractReadRoleUseCase
  extends AbstractUseCase
  implements IReadRoleUseCase
{
  public abstract execute(dto: AbstractReadRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractRoleRepositoryDto | undefined
    >
  >;
}
