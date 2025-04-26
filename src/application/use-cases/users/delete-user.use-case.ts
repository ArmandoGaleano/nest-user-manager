import { Injectable } from '@nestjs/common';

import { knex } from '@/infrastructure/persistence/knex/knex';

import { AbstractDeleteUserUseCase } from '@/core/abstractions/application/use-cases/users/delete-user.use-case.abstract';
import { Either, left, Left, right } from '@/shared/either';
import { AbstractUserValidationService } from '@/core/abstractions/application/services/users/user-validation.service.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/delete-user-repository.dto.abstract';
import { z } from 'zod';
import { AbstractUsersRepositoryService } from '@/core/abstractions/infrastructure/repositories/users.repository.service.abstract';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';
import { DeleteUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/delete-user-repository.dto';

@Injectable()
export class DeleteUserUseCase extends AbstractDeleteUserUseCase {
  constructor(
    private readonly UserValidationService: AbstractUserValidationService,
    private readonly UsersRepositoryService: AbstractUsersRepositoryService,
  ) {
    super();
  }

  public async execute(dto: AbstractDeleteUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserDoesNotExistsError,
      boolean
    >
  > {
    try {
      const eitherValidateDeleteUserSchema =
        this.UserValidationService.validateDeleteUserSchema(dto);

      if (eitherValidateDeleteUserSchema instanceof Left) {
        if (
          eitherValidateDeleteUserSchema.value instanceof InternalServerError
        ) {
          throw eitherValidateDeleteUserSchema.value;
        }

        return eitherValidateDeleteUserSchema;
      }

      const validatedDeleteUserDto = eitherValidateDeleteUserSchema.value;

      const eitherValidateUserExists =
        await this.UserValidationService.isUserRegistered(
          validatedDeleteUserDto,
        );

      if (eitherValidateUserExists instanceof Left) {
        if (eitherValidateUserExists.value instanceof InternalServerError) {
          throw eitherValidateUserExists.value;
        }
        return eitherValidateUserExists;
      }

      if (eitherValidateUserExists.value === false) {
        return left(new UserDoesNotExistsError());
      }

      const eitherDeleteUser = await this.UsersRepositoryService.deleteUser(
        new DeleteUserRepositoryDto(validatedDeleteUserDto),
      );

      if (eitherDeleteUser instanceof Left) {
        if (eitherDeleteUser.value instanceof InternalServerError) {
          throw eitherDeleteUser.value;
        }

        return eitherDeleteUser;
      }

      return right(eitherDeleteUser.value);
    } catch (error) {
      console.error('Error on DeleteUserUseCase');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
