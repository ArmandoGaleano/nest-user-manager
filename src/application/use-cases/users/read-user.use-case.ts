import { Injectable } from '@nestjs/common';

import { ReadUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/read-user-repository.dto';

import { Either, left, Left, right } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UsersRepositoryService } from '@/infrastructure/persistence/repositories/users/user.repository.service';
import { UserValidationService } from '@/application/services/users/user-validation-service/user-validation.service';
import { IReadUserUseCase } from '@/core/interfaces/application/use-cases/users/read-user-use-case.interface';
import { UserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/user-repository.dto';
@Injectable()
export class ReadUserUseCase implements IReadUserUseCase {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly userValidationService: UserValidationService,
  ) {}

  public async execute(dto: ReadUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      UserRepositoryDto | undefined
    >
  > {
    try {
      const eitherValidateReadUserSchema =
        this.userValidationService.validateReadUserSchema(dto);

      if (eitherValidateReadUserSchema instanceof Left) {
        return eitherValidateReadUserSchema;
      }

      const validatedReadUserDto = eitherValidateReadUserSchema.value;

      const eitherReadUser = await this.usersRepositoryService.readUser(
        new ReadUserRepositoryDto(validatedReadUserDto),
      );

      if (eitherReadUser instanceof Left) {
        return eitherReadUser;
      }

      const readUser = eitherReadUser.value;

      return right(readUser);
    } catch (error) {
      console.error('Error on ReadUserUseCase');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
