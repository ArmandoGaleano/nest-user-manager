import { Injectable } from '@nestjs/common';
import { Either, Left, left, right } from '@/shared/either';
import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { z } from 'zod';

import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/shared/helpers/system-date-time-helper.abstract';
import { AbstractUserRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/user-roles.repository.service.abstract';
import { AbstractCreateUserRoleUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.abstract';
import { AbstractUserRolesValidationService } from '@/core/abstractions/application/services/user-roles/user-roles-validation.service.abstract';
import { CreateUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/create-user-role-repository.dto';
import { ZodSchemaInternalValidationError } from '@/core/errors/ZodSchemaInternalValidation.error';
import { UserRoleAlreadyExistError } from '@/core/errors/application/services/user-roles/roles-validation-service/UserRoleAlreadyExistError.error';
import { RoleDoesNotExist } from '@/core/errors/application/services/roles/roles-validation-service/RoleDoesNotExist.error';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.abstract';
import { AbstractCreateUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/create-user-role.use-case.abstract';
import { AbstractUserValidationService } from '@/core/abstractions/application/services/users/user-validation.service.abstract';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';

@Injectable()
export class CreateUserRoleUseCase extends AbstractCreateUserRoleUseCase {
  constructor(
    private readonly UserRoleRepositoryService: AbstractUserRolesRepositoryService,
    private readonly RolesValidationService: AbstractRolesValidationService,
    private readonly UserRolesValidationService: AbstractUserRolesValidationService,
    private readonly UserValidationService: AbstractUserValidationService,
    private readonly SystemDateTimeHelperService: AbstractSystemDateTimeHelperService,
  ) {
    super();
  }

  public async execute(dto: AbstractCreateUserRoleUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleDoesNotExist
      | UserRoleAlreadyExistError
      | UserDoesNotExistsError,
      AbstractUserRoleRepositoryDto
    >
  > {
    try {
      // Validate use case DTO schema
      const eitherValidateCreateUserRoleDto =
        this.UserRolesValidationService.validateCreateUserRoleUseCaseDto(dto);

      if (eitherValidateCreateUserRoleDto instanceof Left) {
        throw eitherValidateCreateUserRoleDto.value;
      }

      // Validate repository DTO schema
      const eitherValidateCreateUserRoleRepositoryDto =
        this.UserRolesValidationService.validateCreateUserRoleRepositorySchema(
          new CreateUserRoleRepositoryDto({
            ...eitherValidateCreateUserRoleDto.value,
            createdAt: this.SystemDateTimeHelperService.getDate(),
            updatedAt: this.SystemDateTimeHelperService.getDate(),
          }),
        );

      if (eitherValidateCreateUserRoleRepositoryDto instanceof Left) {
        if (
          eitherValidateCreateUserRoleRepositoryDto.value instanceof z.ZodError
        ) {
          return left(
            new ZodSchemaInternalValidationError(
              eitherValidateCreateUserRoleRepositoryDto.value,
            ),
          );
        }

        throw eitherValidateCreateUserRoleRepositoryDto.value;
      }

      const createUserRoleRepositoryDto = new CreateUserRoleRepositoryDto(
        eitherValidateCreateUserRoleRepositoryDto.value,
      );

      // Validate role existence
      const eitherValidateRoleExists =
        await this.RolesValidationService.validateRolesExists([
          { id: createUserRoleRepositoryDto.role_id },
        ]);

      if (eitherValidateRoleExists instanceof Left) {
        throw eitherValidateRoleExists.value;
      }

      if (!eitherValidateRoleExists.value.exists) {
        return left(new RoleDoesNotExist());
      }

      // Validate user existence
      const eitherValidateUserExists =
        await this.UserValidationService.isUserRegistered({
          id: createUserRoleRepositoryDto.user_id,
        });

      if (eitherValidateUserExists instanceof Left) {
        throw eitherValidateUserExists.value;
      }

      if (eitherValidateUserExists.value === false) {
        return left(new UserDoesNotExistsError());
      }

      // Validate user role existence
      // Check if the user already has the role
      const eitherValidateUserRoleExists =
        await this.UserRolesValidationService.validateUserRoleExists([
          createUserRoleRepositoryDto,
        ]);

      if (eitherValidateUserRoleExists instanceof Left) {
        throw eitherValidateUserRoleExists;
      }

      if (eitherValidateUserRoleExists.value.exists) {
        return left(new UserRoleAlreadyExistError());
      }

      // Create user role
      const eitherCreateUserRole =
        await this.UserRoleRepositoryService.createUserRole(
          createUserRoleRepositoryDto,
        );

      if (eitherCreateUserRole instanceof Left) {
        throw eitherCreateUserRole.value;
      }

      return right(eitherCreateUserRole.value);
    } catch (error) {
      console.error('CreateUserRoleUseCase error when executing execute');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
