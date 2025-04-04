import { Injectable } from '@nestjs/common';

import { AbstractUseCase } from '@/core/abstractions/base/use-case.abstract';
import { ICreateRoleUseCase } from '@/core/interfaces/use-cases/roles/create-role.use-case.interface';

import { AbstractRoleEntity } from '@/core/entities/role.abstract';
import { AbstractCreateRoleUseCaseDto } from '../../dtos/use-cases/roles/create-role-use-case.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleAlreadyExistError } from '@/core/errors/services/roles/roles-validation-service/RoleAlreadyExistError.error';

@Injectable()
export abstract class AbstractCreateRoleUseCase
  extends AbstractUseCase
  implements ICreateRoleUseCase
{
  public abstract execute(dto: AbstractCreateRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleAlreadyExistError,
      AbstractRoleEntity
    >
  >;
}
