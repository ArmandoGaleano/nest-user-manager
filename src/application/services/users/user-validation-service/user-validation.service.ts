import { Injectable } from '@nestjs/common';

import { AbstractUserValidationService } from '@/core/abstractions/services/users/user-validation.service.abstract';
import { AbstractUsersRepositoryService } from '@/core/abstractions/repositories/users.repository.service.abstract';

import { z } from 'zod';
import { Either, Left, left, right } from '@/shared/either';

import { createUserDtoZodSchema } from './schema/create-user-dto-schema';
import { readUserDtoZodSchema } from './schema/read-user-dto-schema';

import { AbstractUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/user-repository.dto.abstract';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/update-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/dtos/repositories/users/delete-user-repository.dto.abstract';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '../../../../core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { AbstractValidateCreateUserDto } from '@/core/abstractions/dtos/services/users/user-validation-service/validate-create-user.dto.interface';
import { updateUserDtoZodSchema } from './schema/update-user-dto-schema';
import { SearchUsersRepositoryDto } from '@/core/dtos/repositories/users/search-users-repository.dto';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/dtos/repositories/users/search-users-repository.dto.abstract';
import { searchUsersDtoZodSchema } from './schema/search-users-dto-schema';
import { IValidateCreateUserDto } from '@/core/interfaces/dtos/services/users/user-validation-service/validate-create-user.dto.interface';
import { IReadUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/read-user-repository.dto.interface';
import { IUpdateUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/update-user-repository.dto.interface';
import { IDeleteUserRepositoryDto } from '@/core/interfaces/dtos/repositories/users/delete-user-repository.dto.interface';
import { ISearchUsersRepositoryDto } from '@/core/interfaces/dtos/repositories/users/search-users-repository.dto.interface';

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
        >
      | z.ZodEffects<
          z.ZodEffects<
            z.ZodObject<any>,
            {
              [x: string]: any;
            }
          >
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
    IValidateCreateUserDto
  > {
    return this.validateDtoSchema<IValidateCreateUserDto>({
      currentMethodName: 'validateCreateUserSchema',
      zodSchema: createUserDtoZodSchema,
      dto,
    });
  }

  public validateReadUserSchema(dto: AbstractReadUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IReadUserRepositoryDto
  > {
    return this.validateDtoSchema<IReadUserRepositoryDto>({
      currentMethodName: 'validateReadUserSchema',
      zodSchema: readUserDtoZodSchema,
      dto,
    });
  }

  public validateUpdateUserSchema(dto: AbstractUpdateUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IUpdateUserRepositoryDto
  > {
    return this.validateDtoSchema<IUpdateUserRepositoryDto>({
      currentMethodName: 'validateUpdateUserSchema',
      zodSchema: updateUserDtoZodSchema,
      dto,
    });
  }

  public validateDeleteUserSchema(dto: AbstractDeleteUserRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IDeleteUserRepositoryDto
  > {
    return this.validateDtoSchema<IDeleteUserRepositoryDto>({
      currentMethodName: 'validateDeleteUserSchema',
      zodSchema: readUserDtoZodSchema,
      dto,
    });
  }

  public validateSearchUsersSchema(
    dto: AbstractSearchUsersRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ISearchUsersRepositoryDto
  > {
    return this.validateDtoSchema<ISearchUsersRepositoryDto>({
      currentMethodName: 'validateSearchUsersSchema',
      zodSchema: searchUsersDtoZodSchema,
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
      IValidateCreateUserDto
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

  public async validateUpdateUser(
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
  > {
    const validator = this.validateUpdateUserSchema(dto);

    if (validator instanceof Left) {
      return left(validator.value);
    }

    if (validator.value.document && validator.value.documentType) {
      const EitherIsUserRegisted = await this.isUserRegistered({
        document: validator.value.document,
        documentType: validator.value.documentType,
      });

      if (EitherIsUserRegisted instanceof Left) {
        return left(EitherIsUserRegisted.value);
      }

      if (EitherIsUserRegisted.value === true) {
        return left(new UserAlreadyExistsError());
      }
    }

    return right(validator.value);
  }

  public async isUserRegistered({
    id,
    email,
    document,
    documentType,
  }: Optional<
    Pick<UsersModel, 'id' | 'email' | 'document' | 'documentType'>,
    'id' | 'email'
  >): Promise<Either<InternalServerError, boolean>> {
    try {
      const eitherListSearchByExistentAccount = await Promise.all([
        id
          ? this.UserRepositoryService.searchUsers(
              new SearchUsersRepositoryDto({ id }),
            )
          : { value: [] },
        email
          ? this.UserRepositoryService.searchUsers(
              new SearchUsersRepositoryDto({ email }),
            )
          : { value: [] },
        this.UserRepositoryService.searchUsers(
          new SearchUsersRepositoryDto({ document, documentType }),
        ),
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
