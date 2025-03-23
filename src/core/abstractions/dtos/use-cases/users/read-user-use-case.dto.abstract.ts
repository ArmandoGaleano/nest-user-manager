import { IReadUserUseCase } from '@/core/interfaces/use-cases/users/read-user-use-case.interface';
import { AbstractReadUserRepositoryDto } from '../../repositories/users/read-user-repository.dto.abstract';
import { Either } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { AbstractUserRepositoryDto } from '../../repositories/users/user-repository.dto.abstract';

export abstract class AbstractReadUserUseCase implements IReadUserUseCase {
  abstract execute(dto: AbstractReadUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractUserRepositoryDto | undefined
    >
  >;
}
