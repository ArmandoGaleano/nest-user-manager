import { AbstractUseCase } from '@/core/abstractions/@base/use-case.abstract';
import { IDeleteUserUseCase } from '@/core/interfaces/application/use-cases/users/delete-use.use-case.interface';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/delete-user-repository.dto.abstract';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';

export abstract class AbstractDeleteUserUseCase
  extends AbstractUseCase
  implements IDeleteUserUseCase
{
  abstract execute(dto: AbstractDeleteUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserDoesNotExistsError,
      boolean
    >
  >;
}
