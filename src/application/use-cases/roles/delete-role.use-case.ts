import { Injectable } from '@nestjs/common';

import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';

import { AbstractDeleteRoleUseCase } from '@/core/abstractions/application/use-cases/roles/delete-role.use-case.abstract';

import { DeleteRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/delete-role-repository.dto';

import { Either, Left, left } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';
import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/delete-role-repository.dto.abstract';

@Injectable()
export class DeleteRoleUseCase extends AbstractDeleteRoleUseCase {
  constructor(
    private readonly RoleRepositoryService: AbstractRolesRepositoryService,
    private readonly RolesValidationService: AbstractRolesValidationService,
  ) {
    super();
  }

  public async execute(dto: AbstractDeleteRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | RoleNotFoundError
      | InternalServerError,
      boolean
    >
  > {
    try {
      const eitherValidateDeleteRole =
        await this.RolesValidationService.validateDeleteRole(dto);

      if (eitherValidateDeleteRole instanceof Left) {
        if (eitherValidateDeleteRole.value instanceof InternalServerError) {
          throw eitherValidateDeleteRole.value;
        }

        return left(eitherValidateDeleteRole.value);
      }

      const eitherDeleteRole = await this.RoleRepositoryService.deleteRole(
        new DeleteRoleRepositoryDto(eitherValidateDeleteRole.value),
      );

      if (eitherDeleteRole instanceof Left) {
        throw eitherDeleteRole.value;
      }

      return eitherDeleteRole;
    } catch (error) {
      console.error('DeleteUserUseCase error when executing execute');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
