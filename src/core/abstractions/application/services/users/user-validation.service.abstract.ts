import { ICreateUserUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/users/create-user-use-case.dto.interface';
import { ICreateUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/create-user-repository.dto.interface';
import { IReadUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/read-user-repository.dto.interface';
import { IUpdateUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/update-user-repository.dto.interface';
import { IDeleteUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/delete-user-repository.dto.interface';
import { ISearchUsersRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/search-users-repository.dto.interface';
import { IUserValidationService } from '@/core//interfaces/application/services/users/user-validation.service.interface';

import { AbstractCreateUserUseCaseDto } from '../../dtos/use-cases/users/create-user-use-case.dto.abstract';
import { AbstractCreateUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/create-user-repository.dto.abstract';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/update-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/delete-user-repository.dto.abstract';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository.dto.abstract';
import { AbstractValidationService } from '@/core/abstractions/@base/validation-service.abstract';

import { z } from 'zod';
import { Either } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';

export abstract class AbstractUserValidationService
  extends AbstractValidationService
  implements IUserValidationService
{
  public abstract validateCreateUserUseCaseSchema(
    dto: AbstractCreateUserUseCaseDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ICreateUserUseCaseDto
  >;

  public abstract validateCreateUserRepositorySchema(
    dto: AbstractCreateUserRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ICreateUserRepositoryDto
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
    dto: AbstractCreateUserRepositoryDto,
  ): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError,
      AbstractCreateUserRepositoryDto
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

  public abstract isUserRegistered({
    id,
    email,
    document,
    documentType,
  }: Optional<
    Pick<UsersModel, 'id' | 'email' | 'document' | 'documentType'>,
    'id' | 'email' | 'document' | 'documentType'
  >): Promise<Either<InternalServerError, boolean>>;
}
