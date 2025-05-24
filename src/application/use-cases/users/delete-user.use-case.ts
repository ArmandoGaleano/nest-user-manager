import { Injectable } from '@nestjs/common';

import { Either, left, Left, right } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';

import { z } from 'zod';

import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';
import { DeleteUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/delete-user-repository.dto';
import { IDeleteUserUseCase } from '@/core/interfaces/application/use-cases/users/delete-use.use-case.interface';
import { UserValidationService } from '@/application/services/users/user-validation-service/user-validation.service';

import { IDeleteUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/delete-user-repository.dto.interface';
import { UsersRepositoryService } from '@/infrastructure/persistence/repositories/users/user.repository.service';

@Injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    private readonly userValidationService: UserValidationService,
    private readonly usersRepositoryService: UsersRepositoryService,
  ) {}

  public async execute(dto: IDeleteUserRepositoryDto): Promise<
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
        this.userValidationService.validateDeleteUserSchema(dto);

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
        await this.userValidationService.isUserRegistered(
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

      const eitherDeleteUser = await this.usersRepositoryService.deleteUser(
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
