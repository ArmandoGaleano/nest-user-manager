import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Query,
  Body,
} from '@nestjs/common';
import { Request } from 'express';

import { AbstractCreateUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/create-user-role.use-case.abstract';
import { AbstractDeleteUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/delete-user-role.use-case.abstract';
import { AbstractSearchUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/search-user-role.use-case.abstract';

import { ICreateUserRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.interface';
import { IDeleteUserRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto.interface';
import { ISearchUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/search-user-role-repository.dto.interface';

import { CreateUserRoleUseCaseDto } from '@/application/dtos/use-cases/user-roles/create-user-role.use-case.dto';
import { DeleteUserRoleUseCaseDto } from '@/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto';
import { SearchUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/search-user-role-repository.dto';

import { Left } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { UserRoleAlreadyExistError } from '@/core/errors/application/services/user-roles/roles-validation-service/UserRoleAlreadyExistError.error';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';
import { RoleDoesNotExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleDoesNotExistError.error';

@Controller('user-roles')
export class UserRolesV1Controller {
  constructor(
    private readonly CreateUserRoleUseCase: AbstractCreateUserRoleUseCase,
    private readonly DeleteUserRoleUseCase: AbstractDeleteUserRoleUseCase,
    private readonly SearchUserRoleUseCase: AbstractSearchUserRoleUseCase,
  ) {}

  @Post()
  async createUserRole(
    @Req() request: Request,
    @Body() createUserRoleUseCaseDto: ICreateUserRoleUseCaseDto,
  ) {
    try {
      const eitherCreateUserRoleUseCase =
        await this.CreateUserRoleUseCase.execute(
          new CreateUserRoleUseCaseDto(createUserRoleUseCaseDto),
        );

      if (eitherCreateUserRoleUseCase instanceof Left) {
        if (eitherCreateUserRoleUseCase.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherCreateUserRoleUseCase.value.message };
        }

        if (
          eitherCreateUserRoleUseCase.value instanceof RoleDoesNotExistError
        ) {
          request.res?.status(404);
          return { message: eitherCreateUserRoleUseCase.value.message };
        }

        if (
          eitherCreateUserRoleUseCase.value instanceof UserRoleAlreadyExistError
        ) {
          request.res?.status(409);
          return { message: eitherCreateUserRoleUseCase.value.message };
        }
        if (
          eitherCreateUserRoleUseCase.value instanceof UserDoesNotExistsError
        ) {
          request.res?.status(409);
          return { message: eitherCreateUserRoleUseCase.value.message };
        }

        throw eitherCreateUserRoleUseCase.value;
      }

      request.res?.status(201);
      return eitherCreateUserRoleUseCase.value;
    } catch (error) {
      console.error(
        'UserRolesV1Controller error when executing createUserRole',
      );
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }

  @Delete()
  async deleteUserRole(
    @Req() request: Request,
    @Query() deleteUserRoleUseCaseDto: IDeleteUserRoleUseCaseDto,
  ) {
    try {
      const eitherDeleteUserRoleUseCase =
        await this.DeleteUserRoleUseCase.execute(
          new DeleteUserRoleUseCaseDto(deleteUserRoleUseCaseDto),
        );

      if (eitherDeleteUserRoleUseCase instanceof Left) {
        if (eitherDeleteUserRoleUseCase.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherDeleteUserRoleUseCase.value.message };
        }

        if (
          eitherDeleteUserRoleUseCase.value instanceof RoleDoesNotExistError
        ) {
          request.res?.status(404);
          return { message: eitherDeleteUserRoleUseCase.value.message };
        }

        throw eitherDeleteUserRoleUseCase.value;
      }

      if (eitherDeleteUserRoleUseCase.value === false) {
        request.res?.status(404);
        return { message: 'User role does not exist' };
      }

      return eitherDeleteUserRoleUseCase.value;
    } catch (error) {
      console.error(
        'UserRolesV1Controller error when executing deleteUserRole',
      );
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }

  @Get('search')
  async searchUserRoles(
    @Req() request: Request,
    @Query() searchUserRoleRepositoryDto: ISearchUserRoleRepositoryDto,
  ) {
    try {
      const eitherSearchUserRoleUseCase =
        await this.SearchUserRoleUseCase.execute(
          new SearchUserRoleRepositoryDto(searchUserRoleRepositoryDto),
        );

      if (eitherSearchUserRoleUseCase instanceof Left) {
        if (eitherSearchUserRoleUseCase.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherSearchUserRoleUseCase.value.message };
        }

        throw eitherSearchUserRoleUseCase.value;
      }

      return eitherSearchUserRoleUseCase.value;
    } catch (error) {
      console.error(
        'UserRolesV1Controller error when executing searchUserRoles',
      );
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }
}
