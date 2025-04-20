import { Injectable } from '@nestjs/common';

import { AbstractReadRoleUseCase } from '@/core/abstractions/application/use-cases/roles/read-role.use-case.abstract';

import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';
import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';

import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/read-role-repository.dto.abstract';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/role-repository.dto.abstract';
import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';

import { Either, left, Left } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
@Injectable()
export class ReadRoleUseCase extends AbstractReadRoleUseCase {
  constructor(
    private readonly rolesRepositoryService: AbstractRolesRepositoryService,
    private readonly rolesValidationService: AbstractRolesValidationService,
  ) {
    super();
  }

  public async execute(dto: AbstractReadRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractRoleRepositoryDto | undefined
    >
  > {
    try {
      const eitherValidateReadRoleSchema =
        this.rolesValidationService.validateReadRoleSchema(dto);

      if (eitherValidateReadRoleSchema instanceof Left) {
        return eitherValidateReadRoleSchema;
      }

      const readRoleDto = new ReadRoleRepositoryDto(
        eitherValidateReadRoleSchema.value,
      );

      const readRole = await this.rolesRepositoryService.readRole(readRoleDto);

      if (readRole instanceof Left) {
        return readRole;
      }

      return readRole;
    } catch (error) {
      console.error('ReadRoleUseCase error: execute');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
