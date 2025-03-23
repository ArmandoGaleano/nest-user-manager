import { Injectable } from '@nestjs/common';

import { AbstractUseCase } from '@/core/abstractions/base/use-case.abstract';
import type { ICreateUserUseCase } from '../../../interfaces/use-cases/users/create-user.use-case.interface';

import { AbstractCreateUserUseCaseDto } from '../../dtos/use-cases/users/create-user-use-case.dto.abstract';
import { z } from 'zod';
import { Either } from '@/shared/either';

import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleNotFoundError } from '@/core/errors/services/roles/roles-validation-service/RoleNotFoundError.error';
import { AbstractUserEntity } from '../../entities/user.abstract';

@Injectable()
export abstract class AbstractCreateUserUseCase
  extends AbstractUseCase
  implements ICreateUserUseCase
{
  public abstract execute(dto: AbstractCreateUserUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError
      | RoleNotFoundError,
      AbstractUserEntity
    >
  >;
}
