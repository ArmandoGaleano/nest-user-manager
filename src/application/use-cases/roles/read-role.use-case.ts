import { Injectable } from '@nestjs/common';

import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';

import { Either, left, Left } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { IReadRoleUseCase } from '@/core/interfaces/application/use-cases/roles/read-role.use-case.interface';
import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';
import { RolesValidationService } from '@/application/services/roles/roles-validation-service/roles-validation.service';
import { RoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/role-repository.dto';
@Injectable()
export class ReadRoleUseCase implements IReadRoleUseCase {
  constructor(
    private readonly rolesRepositoryService: RolesRepositoryService,
    private readonly rolesValidationService: RolesValidationService,
  ) {}

  public async execute(dto: ReadRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      RoleRepositoryDto | undefined
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
