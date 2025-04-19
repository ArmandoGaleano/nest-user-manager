import { Injectable } from '@nestjs/common';
import { AbstractUpdateRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/roles/update-role-use-case.dto.abstract';

import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';

import { AbstractUpdateRoleUseCase } from '@/core/abstractions/application/use-cases/roles/update-role.use-case.abstract';
import { UpdateRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/update-role-repository.dto';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';
import { Either, left, Left } from '@/shared/either';
import { z } from 'zod';
import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';
import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/shared/helpers/system-date-time-helper.abstract';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/role-repository.dto.abstract';

@Injectable()
export class UpdateRoleUseCase extends AbstractUpdateRoleUseCase {
  constructor(
    private readonly rolesRepositoryService: AbstractRolesRepositoryService,
    private readonly rolesValidationService: AbstractRolesValidationService,
    private readonly SystemDateTimeHelperService: AbstractSystemDateTimeHelperService,
  ) {
    super();
  }

  public async execute(dto: AbstractUpdateRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | RoleAlreadyExistError
      | InternalServerError,
      AbstractRoleRepositoryDto
    >
  > {
    try {
      const eitherValidateUpdateRoleSchema =
        await this.rolesValidationService.validateUpdateRole(
          new UpdateRoleRepositoryDto({
            ...dto.toObject(),
            updatedAt: this.SystemDateTimeHelperService.getDate(),
          }),
        );

      if (eitherValidateUpdateRoleSchema instanceof Left) {
        return eitherValidateUpdateRoleSchema;
      }

      const eitherUpdateRoleRepositoy =
        await this.rolesRepositoryService.updateRole(
          new UpdateRoleRepositoryDto(eitherValidateUpdateRoleSchema.value),
        );

      if (eitherUpdateRoleRepositoy instanceof Left) {
        return eitherUpdateRoleRepositoy;
      }

      return eitherUpdateRoleRepositoy;
    } catch (error) {
      console.error('UpdateRoleUseCase error: execute');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
