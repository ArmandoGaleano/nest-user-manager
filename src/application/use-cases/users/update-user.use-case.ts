import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { AbstractUserValidationService } from '@/core/abstractions/application/services/users/user-validation.service.abstract';

import { Either, Left, left, right } from '@/shared/either';

import { AbstractUpdateUserUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/users/update-user-use-case.dto.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UpdateUserRepositoryError } from '@/core/errors/repositories/users/UpdateUserRepositoryError.error';
import { AbstractUpdateUserUseCase } from '@/core/abstractions/application/use-cases/users/update-user.use-case.abstract';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { UpdateUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/update-user-repository.dto';
import { AbstractUsersRepositoryService } from '@/core/abstractions/infrastructure/repositories/users.repository.service.abstract';
import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/shared/helpers/system-date-time-helper.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/user-repository.dto.abstract';

@Injectable()
export class UpdateUserUseCase extends AbstractUpdateUserUseCase {
  constructor(
    private readonly UserValidationService: AbstractUserValidationService,
    private readonly UsersRepositoryService: AbstractUsersRepositoryService,
    private readonly SystemDateTimeHelperService: AbstractSystemDateTimeHelperService,
  ) {
    super();
  }

  public async execute(dto: AbstractUpdateUserUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError
      | UpdateUserRepositoryError,
      AbstractUserRepositoryDto
    >
  > {
    try {
      const eitherValidateUpdateUserSchema =
        await this.UserValidationService.validateUpdateUser(
          new UpdateUserRepositoryDto({
            ...dto.toObject(),
            updatedAt: this.SystemDateTimeHelperService.getDate(),
          }),
        );

      if (eitherValidateUpdateUserSchema instanceof Left) {
        return left(eitherValidateUpdateUserSchema.value);
      }

      const validateDto = eitherValidateUpdateUserSchema.value;

      const eitherUpdateUser = await this.UsersRepositoryService.updateUser(
        new UpdateUserRepositoryDto(validateDto),
      );

      if (eitherUpdateUser instanceof Left) {
        return left(eitherUpdateUser.value);
      }

      return right(eitherUpdateUser.value);
    } catch (error) {
      console.error('Error on UpdateUserUseCase');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
