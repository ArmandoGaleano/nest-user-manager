import { Injectable } from '@nestjs/common';

import { AbstractUserValidationService } from '@/core/abstractions/application/services/users/user-validation.service.abstract';

import { AbstractUsersRepositoryService } from '@/core/abstractions/infrastructure/repositories/users.repository.service.abstract';

import { ICreateUserUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/users/create-user-use-case.dto.interface';
import { ICreateUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/create-user-repository.dto.interface';
import { IReadUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/read-user-repository.dto.interface';
import { IUpdateUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/update-user-repository.dto.interface';
import { IDeleteUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/delete-user-repository.dto.interface';
import { ISearchUsersRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/search-users-repository.dto.interface';

import { AbstractCreateUserUseCaseDto } from '@/core/abstractions/application/dtos/use-cases/users/create-user-use-case.dto.abstract';
import { AbstractCreateUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/create-user-repository.dto.abstract';
import { AbstractReadUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/read-user-repository.dto.abstract';
import { AbstractUpdateUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/update-user-repository.dto.abstract';
import { AbstractDeleteUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/delete-user-repository.dto.abstract';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository.dto.abstract';
import { AbstractSearchUsersRepositoryResultDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository-result.dto.abstract';

import { CreateUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/create-user-repository.dto';
import { SearchUsersRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository.dto';

import { CreateUserUseCaseDtoSchema } from './schema/use-cases/create-user-use-case.dto.schema';
import { CreateUserRepositoryDtoSchema } from './schema/repository/create-user-repository.dto.schema';
import { ReadUserRepositoryDtoSchema } from './schema/repository/read-user-repository.dto.schema';
import { UpdateUserRepositoryDtoSchema } from './schema/repository/update-user-repository.dto.schema';
import { DeleteUserRepositoryDtoSchema } from './schema/repository/delete-user-repository.dto.schema';
import { SearchUserRepositoryDtoSchema } from './schema/repository/search-users-repository.dto.schema';

import { z } from 'zod';
import { Either, Left, left, Right, right } from '@/shared/either';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';

@Injectable()
export class UserValidationService extends AbstractUserValidationService {
  constructor(
    private readonly UserRepositoryService: AbstractUsersRepositoryService,
  ) {
    super();
  }

  public validateCreateUserUseCaseSchema(
    dto: AbstractCreateUserUseCaseDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ICreateUserUseCaseDto
  > {
    return this.validateDtoSchema<ICreateUserUseCaseDto>({
      currentMethodName: 'validateCreateUserUseCaseSchema',
      zodSchema: new CreateUserUseCaseDtoSchema(),
      dto,
    });
  }

  public validateCreateUserRepositorySchema(
    dto: AbstractCreateUserRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ICreateUserRepositoryDto
  > {
    return this.validateDtoSchema<ICreateUserRepositoryDto>({
      currentMethodName: 'validateCreateUserRepositorySchema',
      zodSchema: new CreateUserRepositoryDtoSchema(),
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
      zodSchema: new ReadUserRepositoryDtoSchema(),
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
      zodSchema: new UpdateUserRepositoryDtoSchema(),
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
      zodSchema: new DeleteUserRepositoryDtoSchema(),
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
      zodSchema: new SearchUserRepositoryDtoSchema(),
      dto,
    });
  }

  public async validateCreateUser(
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
  > {
    const validator = this.validateCreateUserRepositorySchema(dto);

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
      return EitherIsUserRegisted;
    }

    if (EitherIsUserRegisted.value === true) {
      return left(new UserAlreadyExistsError());
    }

    return right(new CreateUserRepositoryDto(validator.value));
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
    'id' | 'email' | 'document' | 'documentType'
  >): Promise<Either<InternalServerError, boolean>> {
    try {
      const eitherListSearchByExistentAccountPromises: Array<
        Promise<
          Either<InternalServerError, AbstractSearchUsersRepositoryResultDto>
        >
      > = [];

      if (id) {
        eitherListSearchByExistentAccountPromises.push(
          this.UserRepositoryService.searchUsers(
            new SearchUsersRepositoryDto({ id }),
          ),
        );
      }

      if (email) {
        eitherListSearchByExistentAccountPromises.push(
          this.UserRepositoryService.searchUsers(
            new SearchUsersRepositoryDto({ email }),
          ),
        );
      }

      if (document && documentType) {
        eitherListSearchByExistentAccountPromises.push(
          this.UserRepositoryService.searchUsers(
            new SearchUsersRepositoryDto({ document, documentType }),
          ),
        );
      }

      if (!eitherListSearchByExistentAccountPromises.length) {
        throw new Error('Any search parameter was provided!');
      }

      const eitherListSearchByExistentAccount = await Promise.all(
        eitherListSearchByExistentAccountPromises,
      );

      const error = eitherListSearchByExistentAccount.find(
        (either) => either instanceof Left,
      );

      if (error instanceof Left) {
        return error;
      }

      const hasExistentAccount = eitherListSearchByExistentAccount.some(
        (rightData: Right<AbstractSearchUsersRepositoryResultDto>) =>
          rightData.value.data.length > 0,
      );

      return right(hasExistentAccount);
    } catch (error) {
      console.error('UserValidationService error: isUserRegistered');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
