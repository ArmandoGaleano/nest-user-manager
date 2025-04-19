import { AbstractUseCase } from '@/core/abstractions/@base/use-case.abstract';
import { IUpdateUserUseCase } from '@/core/interfaces/application/use-cases/users/update-user.use-case.interface';

import { AbstractUpdateUserUseCaseDto } from '../../dtos/use-cases/users/update-user-use-case.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { UpdateUserRepositoryError } from '@/core/errors/repositories/users/UpdateUserRepositoryError.error';
import { AbstractUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/user-repository.dto.abstract';
export abstract class AbstractUpdateUserUseCase
  extends AbstractUseCase
  implements IUpdateUserUseCase
{
  abstract execute(dto: AbstractUpdateUserUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError
      | UpdateUserRepositoryError,
      AbstractUserRepositoryDto
    >
  >;
}
