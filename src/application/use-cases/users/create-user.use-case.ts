import { Injectable } from '@nestjs/common';
import { knex } from 'src/infrastructure/persistence/knex';

import { AbstractCreateUserUseCase } from '../../../core/abstractions/use-cases/users/create-user.use-case.abstract';

import { z } from 'zod';
import { Either, Left, left, right } from '@/shared/either';

import { AbstractUserValidationService } from '@/core/abstractions/services/users/user-validation.service.abstract';
import { AbstractRolesValidationService } from '@/core/abstractions/services/roles/roles-validation.service.abstract';
import { AbstractUsersRepositoryService } from '@/core/abstractions/repositories/users.repository.service.abstract';
import { AbstractUserRolesRepositoryService } from '@/core/abstractions/repositories/user-roles.repository.service.abstract';

import { AbstractCryptoHelperService } from '@/core/abstractions/helpers/crypto-helper.service.abstract';
import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/helpers/system-date-time-helper.abstract';
import { CreateUserRoleDto } from '@/core/dtos/repositories/user-roles/create-user-role-repository.dto';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { AbstractCreateUserUseCaseDto } from '@/core/abstractions/dtos/use-cases/users/create-user-use-case.dto.abstract';
import { UserRepositoryDto } from '@/core/dtos/repositories/users/user-repository.dto';
import { UserEntity } from '@/domain/users/user.entity';
import { AbstractUserEntity } from '@/core/abstractions/entities/user.abstract';
import { RoleNotFoundError } from '@/core/errors/services/roles/roles-validation-service/RoleNotFoundError.error';
import { CreateUserRepositoryDto } from '@/core/dtos/repositories/users/create-user-repository.dto';

@Injectable()
export class CreateUserUseCase extends AbstractCreateUserUseCase {
  constructor(
    private readonly UserValidationService: AbstractUserValidationService,
    private readonly RoleValidationService: AbstractRolesValidationService,
    private readonly UsersRepositoryService: AbstractUsersRepositoryService,
    private readonly UserRolesRepositoryService: AbstractUserRolesRepositoryService,
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
      const userId = this.CryptoHelperService.generateUUID();
      const createdAt = this.SystemDateTimeHelperService.getDate();
      const updatedAt = this.SystemDateTimeHelperService.getDate();

      const eitherValidateCreateUser =
        await this.UserValidationService.validateCreateUser({
          ...dto,
          id: userId,
          createdAt,
          updatedAt,
        });

      if (eitherValidateCreateUser instanceof Left) {
        return left(eitherValidateCreateUser.value);
      }

      const validatedUserData = eitherValidateCreateUser.value;

      const eitherValidateRolesExists =
        await this.RoleValidationService.validateRolesExists(dto.roles);

      if (eitherValidateRolesExists instanceof Left) {
        return left(eitherValidateRolesExists.value);
      }

      const roleIds = eitherValidateRolesExists.value.map((role) => role.id);

      // Create user
      const eitherCreateUser = await this.UsersRepositoryService.createUser(
        new CreateUserRepositoryDto({
          ...validatedUserData,
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
            new CreateUserRoleDto({
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
          return left(role.value);
        }
      }

      return right(
        new UserEntity({
          ...eitherCreateUser.value,
          roles: eitherValidateRolesExists.value,
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
