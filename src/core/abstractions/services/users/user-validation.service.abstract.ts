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
import { AbstractSearchUsersRepositoryDto } from '../../dtos/repositories/users/search-users-repository.dto.abstract';
import { IValidateCreateUserDto } from '@/core/interfaces/dtos/services/users/user-validation-service/validate-create-user.dto.interface';
import { IReadUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/read-user-repository.dto.interface';
import { IUpdateUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/update-user-repository.dto.interface';
import { IDeleteUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/delete-user-repository.dto.interface';
import { ISearchUsersRepositoryDto } from '@/core/interfaces/dtos/repositories/users/search-users-repository.dto.interface';

export abstract class AbstractUserValidationService
  implements IUserValidationService
{
  public abstract validateCreateUserSchema(
    dto: AbstractValidateCreateUserDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IValidateCreateUserDto
  >;
  public abstract validateReadUserSchema(
    dto: AbstractReadUserRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IReadUserRepositoryDto
  >;
  public abstract validateUpdateUserSchema(
    dto: AbstractUpdateUserRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IUpdateUserRepositoryDto
  >;
  public abstract validateDeleteUserSchema(
    dto: AbstractDeleteUserRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IDeleteUserRepositoryDto
  >;

  public abstract validateSearchUsersSchema(
    dto: AbstractSearchUsersRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ISearchUsersRepositoryDto
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
      IValidateCreateUserDto
    >
  >;
  public abstract validateUpdateUser(
    dto: AbstractUpdateUserRepositoryDto,
  ): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError,
      IUpdateUserRepositoryDto
    >
  >;
}
