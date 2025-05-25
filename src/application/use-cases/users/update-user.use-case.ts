import { Injectable } from '@nestjs/common';

import { UpdateUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/update-user-repository.dto';

import { Either, Left, left, right } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UpdateUserRepositoryError } from '@/core/errors/repositories/users/UpdateUserRepositoryError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { IUpdateUserUseCase } from '@/core/interfaces/application/use-cases/users/update-user.use-case.interface';
import { UserValidationService } from '@/application/services/users/user-validation-service/user-validation.service';
import { UsersRepositoryService } from '@/infrastructure/persistence/repositories/users/user.repository.service';
import { SystemDateTimeHelperService } from '@/shared/helpers/system-date-time/system-date-time.helper.service';
import { UpdateUserUseCaseDto } from '@/application/dtos/use-cases/users/update-user-use-case.dto';
import { UserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/user-repository.dto';
@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly userValidationService: UserValidationService,
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly systemDateTimeHelperService: SystemDateTimeHelperService,
  ) {}

  public async execute(dto: UpdateUserUseCaseDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError
      | UpdateUserRepositoryError,
      UserRepositoryDto
    >
  > {
    try {
      const eitherValidateUpdateUserSchema =
        await this.userValidationService.validateUpdateUser(
          new UpdateUserRepositoryDto({
            ...dto.toObject(),
            updatedAt: this.systemDateTimeHelperService.getDate(),
          }),
        );

      if (eitherValidateUpdateUserSchema instanceof Left) {
        return left(eitherValidateUpdateUserSchema.value);
      }

      const validateDto = eitherValidateUpdateUserSchema.value;

      const eitherUpdateUser = await this.usersRepositoryService.updateUser(
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
