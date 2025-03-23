import { Injectable } from '@nestjs/common';
import type { IReadUserUseCase } from '../../../core/interfaces/use-cases/users/read-user-use-case.interface';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUsersRepositoryService } from '@/core/abstractions/repositories/users.repository.service.abstract';
import { Either, left, Left, right } from '@/shared/either';
import { AbstractUserValidationService } from '@/core/abstractions/services/users/user-validation.service.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { z } from 'zod';
import { AbstractReadUserUseCase } from '@/core/abstractions/use-cases/users/read-user.use-case.abstract';

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

      const eitherReadUser =
        await this.UsersRepositoryService.readUser(validatedReadUserDto);

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
