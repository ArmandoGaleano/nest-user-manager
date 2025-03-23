import { AbstractUseCase } from '@/core/abstractions/base/use-case.abstract';
import { IUpdateUserUseCase } from '@/core/interfaces/use-cases/users/update-user.use-case.interface';

import { AbstractUserRepositoryDto } from '../../dtos/repositories/users/user-repository.dto.abstract';
import { AbstractUpdateUserUseCaseDto } from '../../dtos/use-cases/users/update-user-use-case.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { UpdateUserRepositoryError } from '@/core/errors/repository/users/UpdateUserRepositoryError.error';
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
