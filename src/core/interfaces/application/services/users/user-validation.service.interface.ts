import { z } from 'zod';
import { Either } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';

import { IReadUserRepositoryDto } from '../../../infrastructure/dtos/repositories/users/read-user-repository.dto.interface';
import { IUpdateUserRepositoryDto } from '../../../infrastructure/dtos/repositories/users/update-user-repository.dto.interface';
import { IDeleteUserRepositoryDto } from '../../../infrastructure/dtos/repositories/users/delete-user-repository.dto.interface';
import { ISearchUsersRepositoryDto } from '../../../infrastructure/dtos/repositories/users/search-users-repository.dto.interface';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { AbstractCreateUserUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/users/create-user-use-case.dto.abstract';
import { ICreateUserUseCaseDto } from '../../dtos/use-cases/users/create-user-use-case.dto.interface';
import { AbstractCreateUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/create-user-repository.dto.abstract';
import { ICreateUserRepositoryDto } from '../../../infrastructure/dtos/repositories/users/create-user-repository.dto.interface';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/update-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/delete-user-repository.dto.abstract';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository.dto.abstract';

export interface IUserValidationService {
  validateCreateUserUseCaseSchema(dto: AbstractCreateUserUseCaseDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ICreateUserUseCaseDto
  >;

  validateCreateUserRepositorySchema(
    dto: AbstractCreateUserRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ICreateUserRepositoryDto
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
  validateCreateUser(dto: AbstractCreateUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError,
      AbstractCreateUserRepositoryDto
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

  isUserRegistered({
    id,
    email,
    document,
    documentType,
  }: Optional<
    Pick<UsersModel, 'id' | 'email' | 'document' | 'documentType'>,
    'id' | 'email' | 'document' | 'documentType'
  >): Promise<Either<InternalServerError, boolean>>;
}
