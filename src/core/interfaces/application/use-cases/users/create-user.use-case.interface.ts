import { z } from 'zod';
import { Either } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
import { CreateUserUseCaseDto } from '@/application/dtos/use-cases/users/create-user-use-case.dto';
import { UserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/user-repository.dto';

export interface ICreateUserUseCase {
  execute(dto: CreateUserUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError
      | RoleNotFoundError,
      UserRepositoryDto
    >
  >;
}
