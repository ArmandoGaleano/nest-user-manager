import { Injectable } from '@nestjs/common';

import { AbstractReadUserUseCase } from '@/core/abstractions/application/use-cases/users/read-user.use-case.abstract';

import { AbstractUsersRepositoryService } from '@/core/abstractions/infrastructure/repositories/users.repository.service.abstract';
import { AbstractUserValidationService } from '@/core/abstractions/application/services/users/user-validation.service.abstract';

import { AbstractReadUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/read-user-repository.dto.abstract';
import { ReadUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/read-user-repository.dto';

import { Either, left, Left, right } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
@Injectable()
export class ReadUserUseCase extends AbstractReadUserUseCase {
  constructor(
    private readonly UsersRepositoryService: AbstractUsersRepositoryService,
    private readonly UserValidationService: AbstractUserValidationService,
  ) {
    super();
  }

  public async execute(dto: AbstractReadUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      any
    >
  > {
    try {
      const eitherValidateReadUserSchema =
        this.UserValidationService.validateReadUserSchema(dto);

      if (eitherValidateReadUserSchema instanceof Left) {
        return eitherValidateReadUserSchema;
      }

      const validatedReadUserDto = eitherValidateReadUserSchema.value;

      const eitherReadUser = await this.UsersRepositoryService.readUser(
        new ReadUserRepositoryDto(validatedReadUserDto),
      );

      if (eitherReadUser instanceof Left) {
        return eitherReadUser;
      }

      const readUser = eitherReadUser.value;

      return right(readUser?.toObject());
    } catch (error) {
      console.error('Error on ReadUserUseCase');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
