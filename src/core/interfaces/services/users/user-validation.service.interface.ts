import { z } from 'zod';
import { Either } from '@/shared/either';

import { AbstractCreateUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/create-user-repository.dto.abstract';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/delete-user-repository.dto.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/update-user-repository.dto.abstract';
import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { AbstractValidateCreateUserDto } from '@/core/abstractions/dtos/services/users/user-validation-service/validate-create-user.dto.interface';

export interface IUserValidationService {
  validateCreateUserSchema(dto: AbstractCreateUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractCreateUserRepositoryDto
  >;
  validateReadUserSchema(dto: AbstractReadUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractReadUserRepositoryDto
  >;
  validateUpdateUserSchema(dto: AbstractUpdateUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractUpdateUserRepositoryDto
  >;
  validateDeleteUserSchema(dto: AbstractDeleteUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractDeleteUserRepositoryDto
  >;
  validateCreateUser(dto: AbstractValidateCreateUserDto): Promise<
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
