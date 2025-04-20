import { Injectable } from '@nestjs/common';

import { ICreateRoleUseCase } from '@/core/interfaces/application/use-cases/roles/create-role.use-case.interface';

import { AbstractUseCase } from '@/core/abstractions/@base/use-case.abstract';
import { AbstractRoleEntity } from '@/core/abstractions/domain/entities/role.abstract';
import { AbstractCreateRoleUseCaseDto } from '../../dtos/use-cases/roles/create-role-use-case.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';

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
