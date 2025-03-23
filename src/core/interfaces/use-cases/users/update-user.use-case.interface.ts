import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';
import { AbstractUpdateUserUseCaseDto } from '@/core/abstractions/dtos/use-cases/users/update-user-use-case.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UpdateUserRepositoryError } from '@/core/errors/repository/users/UpdateUserRepositoryError.error';
import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { Either } from '@/shared/either';
import { z } from 'zod';

export interface IUpdateUserUseCase {
  execute(dto: AbstractUpdateUserUseCaseDto): Promise<
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
