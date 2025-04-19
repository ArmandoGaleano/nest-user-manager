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
import { z } from 'zod';
import { Left } from '@/shared/either';

import { AbstractCreateUserUseCase } from '@/core/abstractions/application/use-cases/users/create-user.use-case.abstract';
import { AbstractReadUserUseCase } from '@/core/abstractions/application/use-cases/users/read-user.use-case.abstract';
import { AbstractUpdateUserUseCase } from '@/core/abstractions/application/use-cases/users/update-user.use-case.abstract';
import { AbstractDeleteUserUseCase } from '@/core/abstractions/application/use-cases/users/delete-user.use-case.abstract';

import { CreateUserUseCaseDto } from '@/application/dtos/use-cases/users/create-user-use-case.dto';
import { ReadUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/read-user-repository.dto';
import { UpdateUserUseCaseDto } from '@/application/dtos/use-cases/users/update-user-use-case.dto';
import { DeleteUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/delete-user-repository.dto';

import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { AbstractSearchUsersUseCase } from '@/core/abstractions/application/use-cases/users/search-users.use-case.abstract';
import { AbstractSearchUsersRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/search-users-repository.dto.abstract';
import { ICreateUserUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/users/create-user-use-case.dto.interface';
import { IReadUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/read-user-repository.dto.interface';
import { IUpdateUserUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/users/update-user-use-case.dto.interface';
import { IDeleteUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/delete-user-repository.dto.interface';
import { ISearchUsersRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/search-users-repository.dto.interface';
import { SearchUsersRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository.dto';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
@Controller('users')
export class UsersV1Controller {
  constructor(
    private createUserUseCase: AbstractCreateUserUseCase,
    private readUserUseCase: AbstractReadUserUseCase,
    private updateUserUseCase: AbstractUpdateUserUseCase,
    private deleteUserUseCase: AbstractDeleteUserUseCase,
    private searchUsersUseCase: AbstractSearchUsersUseCase,
  ) {}

  @Post()
  async createUser(
    @Req() request: Request,
    @Body() createUserDto: ICreateUserUseCaseDto,
  ) {
    try {
      const eitherCreateUserResult = await this.createUserUseCase.execute(
        new CreateUserUseCaseDto(createUserDto),
      );

      if (eitherCreateUserResult instanceof Left) {
        if (eitherCreateUserResult.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherCreateUserResult.value.errors };
        }

        if (eitherCreateUserResult.value instanceof UserAlreadyExistsError) {
          request.res?.status(409);
          return { message: eitherCreateUserResult.value.message };
        }

        if (eitherCreateUserResult.value instanceof RoleNotFoundError) {
          request.res?.status(404);
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

  @Get()
  async readUser(
    @Req() request: Request,
    @Query() readUserDto: IReadUserRepositoryDto,
  ) {
    try {
      const eitherReadUserResult = await this.readUserUseCase.execute(
        new ReadUserRepositoryDto(readUserDto),
      );

      if (eitherReadUserResult instanceof Left) {
        if (eitherReadUserResult.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherReadUserResult.value.errors };
        }

        request.res?.status(500);
        return { message: eitherReadUserResult.value.message };
      }

      if (!eitherReadUserResult.value) {
        request.res?.status(404);
        return { message: 'User not found' };
      }

      request.res?.status(200);
      return {
        ...eitherReadUserResult.value,
      };
    } catch (error) {
      console.error('Controller error: readUser');
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }

  @Patch()
  async updateUser(
    @Req() request: Request,
    @Body() updateUserDto: IUpdateUserUseCaseDto,
  ) {
    try {
      const eitherCreateUserResult = await this.updateUserUseCase.execute(
        new UpdateUserUseCaseDto(updateUserDto),
      );

      if (eitherCreateUserResult instanceof Left) {
        if (eitherCreateUserResult.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherCreateUserResult.value.errors };
        }

        if (eitherCreateUserResult.value instanceof UserAlreadyExistsError) {
          request.res?.status(409);
          return { message: eitherCreateUserResult.value.message };
        }

        request.res?.status(500);
        return { message: eitherCreateUserResult.value.message };
      }

      request.res?.status(201);
      return {
        ...eitherCreateUserResult.value,
      };
    } catch {
      console.log('error');
    }
  }

  @Delete()
  async deleteUser(
    @Req() request: Request,
    @Query() deleteUserDto: IDeleteUserRepositoryDto,
  ) {
    try {
      const eitherDeleteUserResult = await this.deleteUserUseCase.execute(
        new DeleteUserRepositoryDto(deleteUserDto),
      );

      if (eitherDeleteUserResult instanceof Left) {
        if (eitherDeleteUserResult.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherDeleteUserResult.value.errors };
        }

        request.res?.status(500);
        return { message: eitherDeleteUserResult.value.message };
      }

      if (eitherDeleteUserResult.value === true) {
        request.res?.status(204);
        return;
      }

      request.res?.status(404);
      return { message: 'User not found' };
    } catch {
      console.log('error');
    }
  }

  @Get('search')
  async searchUsers(
    @Req() request: Request,
    @Query() searchUsersDto: ISearchUsersRepositoryDto,
  ) {
    try {
      const eitherSearchUsersResult = await this.searchUsersUseCase.execute(
        new SearchUsersRepositoryDto(searchUsersDto),
      );

      if (eitherSearchUsersResult instanceof Left) {
        if (eitherSearchUsersResult.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherSearchUsersResult.value.errors };
        }

        request.res?.status(500);
        return { message: eitherSearchUsersResult.value.message };
      }

      if (!eitherSearchUsersResult.value) {
        request.res?.status(404);
        return { message: 'User not found' };
      }

      request.res?.status(200);

      return eitherSearchUsersResult.value.data.map((user) => user.toJSON());
    } catch (error) {
      console.error('Controller error: searchUsers');
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }
}
