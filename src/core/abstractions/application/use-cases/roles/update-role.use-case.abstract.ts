import { Injectable } from '@nestjs/common';

import { AbstractUseCase } from '@/core/abstractions/@base/use-case.abstract';
import { IUpdateRoleUseCase } from '@/core/interfaces/application/use-cases/roles/update-role.use-case.interface';

import { AbstractUpdateRoleUseCaseDto } from '../../dtos/use-cases/roles/update-role-use-case.dto.abstract';

import { Either } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/role-repository.dto.abstract';

@Injectable()
export abstract class AbstractUpdateRoleUseCase
  extends AbstractUseCase
  implements IUpdateRoleUseCase
{
  public abstract execute(dto: AbstractUpdateRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | RoleAlreadyExistError
      | InternalServerError,
      AbstractRoleRepositoryDto
    >
  >;
}
