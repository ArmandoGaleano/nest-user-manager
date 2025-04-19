import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { knex } from 'src/infrastructure/persistence/knex';

import { AbstractDeleteUserUseCase } from '@/core/abstractions/application/use-cases/users/delete-user.use-case.abstract';
import { Either, left, Left, right } from '@/shared/either';
import { AbstractUserValidationService } from '@/core/abstractions/application/services/users/user-validation.service.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/delete-user-repository.dto.abstract';

@Injectable()
export class DeleteUserUseCase extends AbstractDeleteUserUseCase {
  constructor(private UserValidationService: AbstractUserValidationService) {
    super();
  }

  public async execute(dto: AbstractDeleteUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      boolean
    >
  > {
    try {
      const eitherValidateDeleteUserSchema =
        this.UserValidationService.validateDeleteUserSchema(dto);

      if (eitherValidateDeleteUserSchema instanceof Left) {
        return left(eitherValidateDeleteUserSchema.value);
      }

      const validatedDeleteUserDto = eitherValidateDeleteUserSchema.value;

      const response = await knex('users')
        .where({
          id: validatedDeleteUserDto.id,
        })
        .delete();

      return right(!!response);
    } catch (error) {
      console.error('Error on DeleteUserUseCase');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
