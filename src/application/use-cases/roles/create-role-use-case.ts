import { Injectable } from '@nestjs/common';
import { AbstractCreateRoleUseCase } from '@/core/abstractions/use-cases/roles/create-role-use-case.abstract';
import { Either, Left, left } from '@/shared/either';
import { AbstractCryptoHelperService } from '@/core/abstractions/helpers/crypto-helper.service.abstract';
import { AbstractRolesRepositoryService } from '@/core/abstractions/repositories/roles.repository.service.abstract';
import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/create-role-repository.dto.abstract';
import { AbstractRolesValidationService } from '@/core/abstractions/services/roles/roles-validation.service.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { AbstractRoleEntity } from '@/core/entities/role.abstract';
import { z } from 'zod';
import { RoleAlreadyExistError } from '@/core/errors/services/roles/roles-validation-service/RoleAlreadyExistError.error';
import { AbstractCreateRoleUseCaseDto } from '@/core/abstractions/dtos/use-cases/roles/create-role-use-case.dto.abstract';
import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/helpers/system-date-time-helper.abstract';

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
        await this.RolesValidationService.validateCreateRole({
          ...dto,
          id: this.CryptoHelperService.generateUUID(),
          createdAt: this.SystemDateTimeHelperService.getDate(),
          updatedAt: this.SystemDateTimeHelperService.getDate(),
        });

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
