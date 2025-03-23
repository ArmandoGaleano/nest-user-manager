import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UpdateUserRepositoryError } from '@/core/errors/repository/users/UpdateUserRepositoryError.error';
import { IUpdateUserUseCase } from '@/core/interfaces/use-cases/users/update-user.use-case.interface';
import { Either } from '@/shared/either';
import { z } from 'zod';
import { AbstractUserRepositoryDto } from '../../dtos/repositories/users/user-repository.dto.abstract';
import { AbstractUpdateUserUseCaseDto } from '../../dtos/use-cases/users/update-user-use-case.dto.abstract';

export abstract class AbstractUpdateUserUseCase implements IUpdateUserUseCase {
  abstract execute(dto: AbstractUpdateUserUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UpdateUserRepositoryError,
      AbstractUserRepositoryDto
    >
  >;
}
