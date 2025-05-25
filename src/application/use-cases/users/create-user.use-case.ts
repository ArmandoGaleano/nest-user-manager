import { Injectable } from '@nestjs/common';

import { CreateUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/create-user-repository.dto';

import { Either, Left, left, right } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
import { ICreateUserUseCase } from '@/core/interfaces/application/use-cases/users/create-user.use-case.interface';
import { UserValidationService } from '@/application/services/users/user-validation-service/user-validation.service';
import { UsersRepositoryService } from '@/infrastructure/persistence/repositories/users/user.repository.service';
import { CryptoHelperService } from '@/shared/helpers/crypto/crypto.helper.service';
import { SystemDateTimeHelperService } from '@/shared/helpers/system-date-time/system-date-time.helper.service';
import { CreateUserUseCaseDto } from '@/application/dtos/use-cases/users/create-user-use-case.dto';
import { RolesValidationService } from '@/application/services/roles/roles-validation-service/roles-validation.service';
import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';
import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';
import { UserRolesRepositoryService } from '@/infrastructure/persistence/repositories/user_roles/user-roles.repository.service';
import { CreateUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/create-user-role-repository.dto';
import { UserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/user-repository.dto';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userValidationService: UserValidationService,
    private readonly roleValidationService: RolesValidationService,
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly rolesRepositoryService: RolesRepositoryService,
    private readonly userRolesRepositoryService: UserRolesRepositoryService,
    private readonly cryptoHelperService: CryptoHelperService,
    private readonly systemDateTimeHelperService: SystemDateTimeHelperService,
  ) {}

  public async execute(dto: CreateUserUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError
      | RoleNotFoundError,
      UserRepositoryDto
    >
  > {
    try {
      // Validate use case DTO schema
      const eitherValidateCreateUserUseCaseDto =
        this.userValidationService.validateCreateUserUseCaseSchema(dto);

      if (eitherValidateCreateUserUseCaseDto instanceof Left) {
        return eitherValidateCreateUserUseCaseDto;
      }

      const { roleNames } = eitherValidateCreateUserUseCaseDto.value;

      const userId = this.cryptoHelperService.generateUUID();
      const createdAt = this.systemDateTimeHelperService.getDate();
      const updatedAt = this.systemDateTimeHelperService.getDate();

      try {
        // Validate repository DTO schema and validate user existence
        const eitherValidateCreateUser =
          await this.userValidationService.validateCreateUser(
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
          await this.roleValidationService.validateRolesExists(
            roleNames.map((roleName) => ({ name: roleName })),
          );

        if (eitherValidateRolesExists instanceof Left) {
          return left(eitherValidateRolesExists.value);
        }

        // Array of role promises
        const eitherRolePromises = roleNames.map((roleName) => {
          return this.rolesRepositoryService.readRole(
            new ReadRoleRepositoryDto({
              name: roleName,
            }),
          );
        });

        // Wait for all promises to resolve
        const rolesSearched = (await Promise.all(eitherRolePromises)).map(
          (eitherRole) => {
            if (eitherRole instanceof Left) {
              throw eitherRole;
            }

            if (eitherRole.value === undefined) {
              throw new RoleNotFoundError(
                roleNames.map((roleName) => ({ name: roleName })),
              );
            }

            return eitherRole.value;
          },
        );

        // Create user
        const eitherCreateUser = await this.usersRepositoryService.createUser(
          new CreateUserRepositoryDto({
            ...validatedUserData.toObject(),
            password: await this.cryptoHelperService.hashPassword(
              validatedUserData.password,
            ),
          }),
        );

        if (eitherCreateUser instanceof Left) {
          return left(eitherCreateUser.value);
        }

        // Define user roles
        const searchedRoleIds = rolesSearched.map((role) => role.id);
        const definedRoles = await Promise.all(
          searchedRoleIds.map((roleId) =>
            this.userRolesRepositoryService.createUserRole(
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

        return right(eitherCreateUser.value);
      } catch (error) {
        if (error instanceof RoleNotFoundError) {
          console.warn('CreateUserUseCase error: execute');
          console.warn(error);

          return left(error);
        }

        console.error('CreateUserUseCase error: execute');
        console.error(error);

        return left(new InternalServerError());
      }
    } catch (error) {
      console.error('CreateUserUseCase error: execute');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
