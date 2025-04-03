import { z } from 'zod';
import { Either } from '@/shared/either';

import { AbstractReadUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/delete-user-repository.dto.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/update-user-repository.dto.abstract';
import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { AbstractValidateCreateUserDto } from '@/core/abstractions/dtos/services/users/user-validation-service/validate-create-user.dto.interface';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/dtos/repositories/users/search-users-repository.dto.abstract';
import { IValidateCreateUserDto } from '../../dtos/services/users/user-validation-service/validate-create-user.dto.interface';
import { IReadUserRepositoryDto } from '../../dtos/repositories/users/read-user-repository.dto.interface';
import { IUpdateUserRepositoryDto } from '../../dtos/repositories/users/update-user-repository.dto.interface';
import { IDeleteUserRepositoryDto } from '../../dtos/repositories/users/delete-user-repository.dto.interface';
import { ISearchUsersRepositoryDto } from '../../dtos/repositories/users/search-users-repository.dto.interface';

export interface IUserValidationService {
  validateCreateUserSchema(dto: AbstractValidateCreateUserDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IValidateCreateUserDto
  >;
  validateReadUserSchema(dto: AbstractReadUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IReadUserRepositoryDto
  >;
  validateUpdateUserSchema(dto: AbstractUpdateUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IUpdateUserRepositoryDto
  >;
  validateDeleteUserSchema(dto: AbstractDeleteUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IDeleteUserRepositoryDto
  >;
  validateSearchUsersSchema(dto: AbstractSearchUsersRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ISearchUsersRepositoryDto
  >;
  validateCreateUser(dto: AbstractValidateCreateUserDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError,
      IValidateCreateUserDto
    >
  >;

  validateUpdateUser(dto: AbstractUpdateUserRepositoryDto): Promise<
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
