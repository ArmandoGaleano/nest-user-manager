import { z } from 'zod';
import { Either } from '@/shared/either';

import { IUserValidationService } from '../../../interfaces/services/users/user-validation.service.interface';
import { AbstractCreateUserRepositoryDto } from '../../dtos/repositories/users/create-user-repository.dto.abstract';
import { AbstractReadUserRepositoryDto } from '../../dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUpdateUserRepositoryDto } from '../../dtos/repositories/users/update-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '../../dtos/repositories/users/delete-user-repository.dto.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { AbstractValidateCreateUserDto } from '../../dtos/services/users/user-validation-service/validate-create-user.dto.interface';

export abstract class AbstractUserValidationService
  implements IUserValidationService
{
  public abstract validateCreateUserSchema(
    dto: AbstractCreateUserRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractCreateUserRepositoryDto
  >;
  public abstract validateReadUserSchema(
    dto: AbstractReadUserRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractReadUserRepositoryDto
  >;
  public abstract validateUpdateUserSchema(
    dto: AbstractUpdateUserRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractUpdateUserRepositoryDto
  >;
  public abstract validateDeleteUserSchema(
    dto: AbstractDeleteUserRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractDeleteUserRepositoryDto
  >;
  public abstract validateCreateUser(
    dto: AbstractValidateCreateUserDto,
  ): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError,
      AbstractValidateCreateUserDto
    >
  >;
}
