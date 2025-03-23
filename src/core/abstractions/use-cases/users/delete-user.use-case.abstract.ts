import { AbstractUseCase } from '@/core/abstractions/base/use-case.abstract';
import { IDeleteUserUseCase } from '@/core/interfaces/use-cases/users/delete-use.use-case.interface';

import { AbstractDeleteUserRepositoryDto } from '../../dtos/repositories/users/delete-user-repository.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';

export abstract class AbstractDeleteUserUseCase
  extends AbstractUseCase
  implements IDeleteUserUseCase
{
  abstract execute(dto: AbstractDeleteUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      boolean
    >
  >;
}
