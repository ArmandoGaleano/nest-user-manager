import { Injectable } from '@nestjs/common';

import { AbstractDeleteUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/delete-user-role.use-case.abstract';

import { AbstractUserRolesValidationService } from '@/core/abstractions/application/services/user-roles/user-roles-validation.service.abstract';
import { AbstractUserRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/user-roles.repository.service.abstract';
import { AbstractDeleteUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/delete-user-role.dto.abstract';
import { DeleteUserRoleUseCaseDto } from '@/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto';

import { Either, Left, left } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleDoesNotExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleDoesNotExistError.error';
@Injectable()
export class DeleteUserRoleUseCase extends AbstractDeleteUserRoleUseCase {
  constructor(
    private readonly UserRolesValidationService: AbstractUserRolesValidationService,
    private readonly UserRolesRepositoryService: AbstractUserRolesRepositoryService,
  ) {
    super();
  }

  async execute(dto: AbstractDeleteUserRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleDoesNotExistError,
      boolean
    >
  > {
    try {
      const eitherValidateDeleteUserRoleRepositorySchema =
        this.UserRolesValidationService.validateDeleteUserRoleRepositorySchema(
          dto,
        );

      if (eitherValidateDeleteUserRoleRepositorySchema instanceof Left) {
        if (
          eitherValidateDeleteUserRoleRepositorySchema.value instanceof
          InternalServerError
        ) {
          throw eitherValidateDeleteUserRoleRepositorySchema.value;
        }

        return left(eitherValidateDeleteUserRoleRepositorySchema.value);
      }

      const eitherValidateUserRoleExists =
        await this.UserRolesValidationService.validateUserRoleExists([
          eitherValidateDeleteUserRoleRepositorySchema.value,
        ]);

      if (eitherValidateUserRoleExists instanceof Left) {
        if (eitherValidateUserRoleExists.value instanceof InternalServerError) {
          throw eitherValidateUserRoleExists.value;
        }

        return left(eitherValidateUserRoleExists.value);
      }

      if (eitherValidateUserRoleExists.value.exists === false) {
        return left(new RoleDoesNotExistError());
      }

      const eitherDeleteUserRole =
        await this.UserRolesRepositoryService.deleteUserRole(
          new DeleteUserRoleUseCaseDto(
            eitherValidateDeleteUserRoleRepositorySchema.value,
          ),
        );

      if (eitherDeleteUserRole instanceof Left) {
        if (eitherDeleteUserRole.value instanceof InternalServerError) {
          throw eitherDeleteUserRole.value;
        }

        return left(eitherDeleteUserRole.value);
      }

      return eitherDeleteUserRole;
    } catch (error) {
      console.error('DeleteUserRoleUseCase error when executing execute');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
