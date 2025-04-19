import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Query,
  Body,
} from '@nestjs/common';
import { Request } from 'express';

import { Left } from '@/shared/either';
import { z } from 'zod';

import { AbstractCreateUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/create-user-role.use-case.abstract';
import { RoleDoesNotExist } from '@/core/errors/application/services/roles/roles-validation-service/RoleDoesNotExist.error';

import { AbstractDeleteUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/delete-user-role.use-case.abstract';
import { UserRoleDoesNotExistError } from '@/core/errors/application/services/user-roles/roles-validation-service/UserRoleDoesNotExistError.error';
import { ICreateUserRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/user-roles/create-user-role-use-case.dto.interface';
import { CreateUserRoleUseCaseDto } from '@/application/dtos/use-cases/user-roles/create-user-role.use-case.dto';

import { DeleteUserRoleUseCaseDto } from '@/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto';
import { IDeleteUserRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/user-roles/delete-user-role.use-case.dto.interface';
import { UserRoleAlreadyExistError } from '@/core/errors/application/services/user-roles/roles-validation-service/UserRoleAlreadyExistError.error';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';
import { ISearchUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/search-user-role-repository.dto.interface';
import { AbstractSearchUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/search-user-role.use-case.abstract';
import { SearchUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/search-user-role-repository.dto';
import { InternalServerError } from '@/core/errors/InternalServerError.error';

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
    @Body() createUserRoleDto: ICreateUserRoleUseCaseDto,
  ) {
    try {
      const eitherCreateUserResult = await this.CreateUserRoleUseCase.execute(
        new CreateUserRoleUseCaseDto(createUserRoleDto),
      );

      if (eitherCreateUserResult instanceof Left) {
        if (eitherCreateUserResult.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherCreateUserResult.value.message };
        }

        if (eitherCreateUserResult.value instanceof RoleDoesNotExist) {
          request.res?.status(404);
          return { message: eitherCreateUserResult.value.message };
        }

        if (eitherCreateUserResult.value instanceof UserRoleAlreadyExistError) {
          request.res?.status(409);
          return { message: eitherCreateUserResult.value.message };
        }
        if (eitherCreateUserResult.value instanceof UserDoesNotExistsError) {
          request.res?.status(409);
          return { message: eitherCreateUserResult.value.message };
        }

        request.res?.status(500);
        return { message: eitherCreateUserResult.value.message };
      }

      request.res?.status(201);
      return eitherCreateUserResult.value;
    } catch {
      console.log('error');
    }
  }

  @Delete()
  async deleteUserRole(
    @Req() request: Request,
    @Query() deleteRoleUseCaseDto: IDeleteUserRoleUseCaseDto,
  ) {
    try {
      const eitherDeleteRoleResult = await this.DeleteUserRoleUseCase.execute(
        new DeleteUserRoleUseCaseDto(deleteRoleUseCaseDto),
      );

      if (eitherDeleteRoleResult instanceof Left) {
        if (eitherDeleteRoleResult.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherDeleteRoleResult.value.message };
        }

        if (eitherDeleteRoleResult.value instanceof UserRoleDoesNotExistError) {
          request.res?.status(404);
          return { message: eitherDeleteRoleResult.value.message };
        }

        request.res?.status(500);
        return { message: eitherDeleteRoleResult.value.message };
      }

      if (eitherDeleteRoleResult.value === false) {
        request.res?.status(404);
        return { message: 'User role does not exist' };
      }

      return eitherDeleteRoleResult.value;
    } catch {
      console.log('error');
    }
  }

  @Get('search')
  async searchUserRoles(
    @Req() request: Request,
    @Query() searchUserRoleDto: ISearchUserRoleRepositoryDto,
  ) {
    try {
      const eitherSearchUserRoleResult =
        await this.SearchUserRoleUseCase.execute(
          new SearchUserRoleRepositoryDto(searchUserRoleDto),
        );

      if (eitherSearchUserRoleResult instanceof Left) {
        if (eitherSearchUserRoleResult.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherSearchUserRoleResult.value.message };
        }

        throw new InternalServerError();
      }

      return eitherSearchUserRoleResult.value;
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
