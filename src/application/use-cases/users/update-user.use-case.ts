import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { AbstractUserValidationService } from '@/core/abstractions/services/users/user-validation.service.abstract';
import { AbstractUsersRepositoryService } from '@/core/abstractions/repositories/users.repository.service.abstract';
import { Either, Left, left, right } from '@/shared/either';
import { AbstractSystemDateTimeHelperService } from '@/core/abstractions/helpers/system-date-time-helper.abstract';
import { AbstractUpdateUserUseCaseDto } from '@/core/abstractions/dtos/use-cases/users/update-user-use-case.dto.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UpdateUserRepositoryError } from '@/core/errors/repository/users/UpdateUserRepositoryError.error';
import { AbstractUpdateUserUseCase } from '@/core/abstractions/use-cases/users/update-user.use-case.abstract';
import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';

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
        await this.UserValidationService.validateUpdateUser({
          ...dto,
          updatedAt: this.SystemDateTimeHelperService.getDate(),
        });

      if (eitherValidateUpdateUserSchema instanceof Left) {
        return left(eitherValidateUpdateUserSchema.value);
      }

      const validateDto = eitherValidateUpdateUserSchema.value;

      const eitherUpdateUser =
        await this.UsersRepositoryService.updateUser(validateDto);

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
