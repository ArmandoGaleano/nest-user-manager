import { Injectable } from '@nestjs/common';

import { AbstractCreateUserUseCase } from '../../../core/abstractions/application/use-cases/users/create-user.use-case.abstract';

import { z } from 'zod';
import { Either, Left, left, right } from '@/shared/either';

import { AbstractUserValidationService } from '@/core/abstractions/application/services/users/user-validation.service.abstract';
import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';
import { AbstractUsersRepositoryService } from '@/core/abstractions/infrastructure/repositories/users.repository.service.abstract';
import { AbstractUserRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/user-roles.repository.service.abstract';
import { AbstractCryptoHelperService } from '@/core/abstractions/shared/helpers/crypto-helper.service.abstract';
import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/shared/helpers/system-date-time-helper.abstract';

import { AbstractCreateUserUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/users/create-user-use-case.dto.abstract';
import { AbstractUserEntity } from '@/core/abstractions/domain/entities/user.abstract';
import { CreateUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/create-user-role-repository.dto';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { UserEntity } from '@/domain/users/user.entity';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
import { CreateUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/create-user-repository.dto';
import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';
import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';

@Injectable()
export class CreateUserUseCase extends AbstractCreateUserUseCase {
  constructor(
    private readonly UserValidationService: AbstractUserValidationService,
    private readonly RoleValidationService: AbstractRolesValidationService,
    private readonly UsersRepositoryService: AbstractUsersRepositoryService,
    private readonly UserRolesRepositoryService: AbstractUserRolesRepositoryService,
    private readonly RolesRepositoryService: AbstractRolesRepositoryService,
    private readonly CryptoHelperService: AbstractCryptoHelperService,
    private readonly SystemDateTimeHelperService: AbstractSystemDateTimeHelperService,
  ) {
    super();
  }

  public async execute(dto: AbstractCreateUserUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError
      | RoleNotFoundError,
      AbstractUserEntity
    >
  > {
    try {
      // Validate use case DTO schema
      const eitherValidateCreateUserUseCaseDto =
        this.UserValidationService.validateCreateUserUseCaseSchema(dto);

      if (eitherValidateCreateUserUseCaseDto instanceof Left) {
        return eitherValidateCreateUserUseCaseDto;
      }

      const { roles } = eitherValidateCreateUserUseCaseDto.value;

      const userId = this.CryptoHelperService.generateUUID();
      const createdAt = this.SystemDateTimeHelperService.getDate();
      const updatedAt = this.SystemDateTimeHelperService.getDate();

      // Validate repository DTO schema and validate user existence
      const eitherValidateCreateUser =
        await this.UserValidationService.validateCreateUser(
          new CreateUserRepositoryDto({
            ...eitherValidateCreateUserUseCaseDto.value,
            id: userId,
            createdAt,
            updatedAt,
          }),
        );

      if (eitherValidateCreateUser instanceof Left) {
        return eitherValidateCreateUser;
      }

      const validatedUserData = eitherValidateCreateUser.value;

      // Validate role existence
      const eitherValidateRolesExists =
        await this.RoleValidationService.validateRolesExists(
          roles.map((roleName) => ({ name: roleName })),
        );

      if (eitherValidateRolesExists instanceof Left) {
        return left(eitherValidateRolesExists.value);
      }

      const eitherRolePromises = roles.map((roleName) => {
        return this.RolesRepositoryService.readRole(
          new ReadRoleRepositoryDto({
            name: roleName,
          }),
        );
      });

      const rolesSearched = (await Promise.all(eitherRolePromises)).map(
        (eitherRole) => {
          if (eitherRole instanceof Left) {
            throw eitherRole;
          }

          if (eitherRole.value === undefined) {
            throw new RoleNotFoundError(
              roles.map((roleName) => ({ name: roleName })),
            );
          }

          return eitherRole.value;
        },
      );

      const roleIds = rolesSearched.map((role) => role.id);

      // Create user
      const eitherCreateUser = await this.UsersRepositoryService.createUser(
        new CreateUserRepositoryDto({
          ...validatedUserData.toObject(),
          password: await this.CryptoHelperService.hashPassword(
            validatedUserData.password,
          ),
        }),
      );

      if (eitherCreateUser instanceof Left) {
        return left(eitherCreateUser.value);
      }

      // Create user roles
      const definedRoles = await Promise.all(
        roleIds.map((roleId) =>
          this.UserRolesRepositoryService.createUserRole(
            new CreateUserRoleRepositoryDto({
              user_id: validatedUserData.id,
              role_id: roleId,
              createdAt,
              updatedAt,
            }),
          ),
        ),
      );

      for (const role of definedRoles) {
        if (role instanceof Left) {
          throw role.value;
        }
      }

      return right(
        new UserEntity({
          ...eitherCreateUser.value.toObject(),
          roles: rolesSearched.map((role) => role.toObject()),
        }),
      );
    } catch (error) {
      console.error('CreateUserUseCase error: execute');
      console.error(error);

      if (error instanceof Error) {
        return left(error);
      }

      return left(new InternalServerError());
    }
  }
}
