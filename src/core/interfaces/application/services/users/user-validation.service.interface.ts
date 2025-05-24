import { z } from 'zod';
import { Either } from '@/shared/either';

import { ICreateUserRepositoryDto } from '../../../infrastructure/dtos/repositories/users/create-user-repository.dto.interface';
import { IReadUserRepositoryDto } from '../../../infrastructure/dtos/repositories/users/read-user-repository.dto.interface';
import { IUpdateUserRepositoryDto } from '../../../infrastructure/dtos/repositories/users/update-user-repository.dto.interface';
import { IDeleteUserRepositoryDto } from '../../../infrastructure/dtos/repositories/users/delete-user-repository.dto.interface';
import { ISearchUsersRepositoryDto } from '../../../infrastructure/dtos/repositories/users/search-users-repository.dto.interface';

import { CreateUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/create-user-repository.dto';
import { UpdateUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/update-user-repository.dto';

import { ICreateUserUseCaseDto } from '../../dtos/use-cases/users/create-user-use-case.dto.interface';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { UsersModel } from '@/infrastructure/persistence/database-models/users.model';
export interface IUserValidationService {
  validateCreateUserUseCaseSchema(dto: ICreateUserUseCaseDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ICreateUserUseCaseDto
  >;

  validateCreateUserRepositorySchema(dto: ICreateUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ICreateUserRepositoryDto
  >;
  validateReadUserSchema(dto: IReadUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IReadUserRepositoryDto
  >;
  validateUpdateUserSchema(dto: IUpdateUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IUpdateUserRepositoryDto
  >;
  validateDeleteUserSchema(dto: IDeleteUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IDeleteUserRepositoryDto
  >;
  validateSearchUsersSchema(dto: ISearchUsersRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ISearchUsersRepositoryDto
  >;
  validateCreateUser(dto: ICreateUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError,
      CreateUserRepositoryDto
    >
  >;

  validateUpdateUser(dto: IUpdateUserRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError,
      UpdateUserRepositoryDto
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
