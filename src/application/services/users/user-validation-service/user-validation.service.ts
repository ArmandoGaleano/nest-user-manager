import { Injectable } from '@nestjs/common';

import { AbstractUserValidationService } from '@/core/abstractions/services/users/user-validation.service.abstract';
import { AbstractUsersRepositoryService } from '@/core/abstractions/repositories/users.repository.service.abstract';

import { z } from 'zod';
import { Either, Left, left, right } from '@/shared/either';

import { createUserDtoZodSchema } from './schema/create-user-dto-schema';
import { readUserDtoZodSchema } from './schema/read-user-dto-schema';

import { AbstractCreateUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/create-user-repository.dto.abstract';
import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/update-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/delete-user-repository.dto.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '../../../../core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { AbstractValidateCreateUserDto } from '@/core/abstractions/dtos/services/users/user-validation-service/validate-create-user.dto.interface';

@Injectable()
export class UserValidationService extends AbstractUserValidationService {
  constructor(
    private readonly UserRepositoryService: AbstractUsersRepositoryService,
  ) {
    super();
  }

  private validateDtoSchema<TDto>({
    currentMethodName,
    zodSchema,
    dto,
  }: {
    currentMethodName: string;
    zodSchema:
      | z.ZodObject<any, any>
      | z.ZodEffects<
          z.ZodObject<any>,
          {
            [x: string]: any;
          }
        >;
    dto: TDto;
  }): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    TDto
  > {
    try {
      const { data = {}, error } = zodSchema.safeParse(dto);

      if (error) {
        return left(error);
      }

      return right(data as TDto);
    } catch (error) {
      console.error(`${currentMethodName} error when executing validateDto`);
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public validateCreateUserSchema(dto: AbstractValidateCreateUserDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractValidateCreateUserDto
  > {
    return this.validateDtoSchema<AbstractValidateCreateUserDto>({
      currentMethodName: 'validateCreateUser',
      zodSchema: createUserDtoZodSchema,
      dto,
    });
  }

  public validateReadUserSchema(dto: AbstractReadUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractReadUserRepositoryDto
  > {
    return this.validateDtoSchema<AbstractReadUserRepositoryDto>({
      currentMethodName: 'validateReadUser',
      zodSchema: readUserDtoZodSchema,
      dto,
    });
  }

  public validateUpdateUserSchema(dto: AbstractUpdateUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractUpdateUserRepositoryDto
  > {
    return this.validateDtoSchema<AbstractUpdateUserRepositoryDto>({
      currentMethodName: 'validateUpdateUser',
      zodSchema: readUserDtoZodSchema,
      dto,
    });
  }

  public validateDeleteUserSchema(dto: AbstractDeleteUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractDeleteUserRepositoryDto
  > {
    return this.validateDtoSchema<AbstractDeleteUserRepositoryDto>({
      currentMethodName: 'validateDeleteUser',
      zodSchema: readUserDtoZodSchema,
      dto,
    });
  }

  public async validateCreateUser(dto: AbstractValidateCreateUserDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | UserAlreadyExistsError,
      AbstractValidateCreateUserDto
    >
  > {
    const validator = this.validateCreateUserSchema(dto);

    if (validator instanceof Left) {
      return left(validator.value);
    }

    const EitherIsUserRegisted = await this.isUserRegistered({
      id: dto.id,
      email: dto.email,
      document: dto.document,
      documentType: dto.documentType,
    });

    if (EitherIsUserRegisted instanceof Left) {
      return left(EitherIsUserRegisted.value);
    }

    if (EitherIsUserRegisted.value === true) {
      return left(new UserAlreadyExistsError());
    }

    return right(validator.value);
  }

  public async isUserRegistered({
    id,
    email,
    document,
    documentType,
  }: Pick<UsersModel, 'id' | 'email' | 'document' | 'documentType'>): Promise<
    Either<InternalServerError, boolean>
  > {
    try {
      const eitherListSearchByExistentAccount = await Promise.all([
        this.UserRepositoryService.searchUsers({ id }),
        this.UserRepositoryService.searchUsers({ email }),
        this.UserRepositoryService.searchUsers({ document, documentType }),
      ]);

      const error = eitherListSearchByExistentAccount.find(
        (either) => either instanceof Left,
      );

      if (error instanceof Left) {
        return error;
      }

      const hasExistentAccount = eitherListSearchByExistentAccount.some(
        (either) => (either.value as AbstractUserRepositoryDto[]).length > 0,
      );

      return right(hasExistentAccount);
    } catch (error) {
      console.error('UserValidationService error: isUserRegistered');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
