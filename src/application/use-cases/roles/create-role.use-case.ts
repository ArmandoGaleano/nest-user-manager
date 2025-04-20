import { Injectable } from '@nestjs/common';

import { AbstractCreateRoleUseCase } from '@/core/abstractions/application/use-cases/roles/create-role.use-case.abstract';

import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';
import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';
import { AbstractCryptoHelperService } from '@/core/abstractions/shared/helpers/crypto-helper.service.abstract';
import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/shared/helpers/system-date-time-helper.abstract';

import { AbstractCreateRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/roles/create-role-use-case.dto.abstract';
import { AbstractRoleEntity } from '@/core/abstractions/domain/entities/role.abstract';
import { CreateRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/create-role-repository.dto';

import { Either, Left, left } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';

@Injectable()
export class CreateRoleUseCase extends AbstractCreateRoleUseCase {
  constructor(
    private readonly RoleRepositoryService: AbstractRolesRepositoryService,
    private readonly RolesValidationService: AbstractRolesValidationService,
    private readonly CryptoHelperService: AbstractCryptoHelperService,
    private readonly SystemDateTimeHelperService: AbstractSystemDateTimeHelperService,
  ) {
    super();
  }

  public async execute(dto: AbstractCreateRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleAlreadyExistError,
      AbstractRoleEntity
    >
  > {
    try {
      const eitherValidateRoleDto =
        await this.RolesValidationService.validateCreateRole(
          new CreateRoleRepositoryDto({
            ...dto.toObject(),
            id: this.CryptoHelperService.generateUUID(),
            createdAt: this.SystemDateTimeHelperService.getDate(),
            updatedAt: this.SystemDateTimeHelperService.getDate(),
          }),
        );

      if (eitherValidateRoleDto instanceof Left) {
        return left(eitherValidateRoleDto.value);
      }

      const eitherCreateRole = await this.RoleRepositoryService.createRole(
        eitherValidateRoleDto.value,
      );

      if (eitherCreateRole instanceof Left) {
        return left(eitherCreateRole.value);
      }

      return eitherCreateRole;
    } catch (error) {
      console.error('CreateUserUseCase error when executing execute');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
