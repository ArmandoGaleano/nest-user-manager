import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { IDeleteUserUseCase } from '@/core/interfaces/use-cases/users/delete-use.use-case.interface';
import { Either } from '@/shared/either';
import { z } from 'zod';
import { AbstractDeleteUserRepositoryDto } from '../../dtos/repositories/users/delete-user-repository.dto.abstract';

export abstract class AbstractDeleteUserUseCase implements IDeleteUserUseCase {
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
