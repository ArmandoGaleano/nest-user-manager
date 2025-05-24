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

import { CreateUserUseCase } from '@/application/use-cases/users/create-user.use-case';
import { ReadUserUseCase } from '@/application/use-cases/users/read-user.use-case';
import { UpdateUserUseCase } from '@/application/use-cases/users/update-user.use-case';
import { DeleteUserUseCase } from '@/application/use-cases/users/delete-user.use-case';
import { SearchUsersUseCase } from '@/application/use-cases/users/search-users.use-case';

import { CreateUserUseCaseDto } from '@/application/dtos/use-cases/users/create-user-use-case.dto';
import { ReadUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/read-user-repository.dto';
import { UpdateUserUseCaseDto } from '@/application/dtos/use-cases/users/update-user-use-case.dto';
import { DeleteUserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/delete-user-repository.dto';
import { SearchUsersRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/search-users-repository.dto';

import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';
import { UserDoesNotExistsError } from '@/core/errors/application/services/users/user-validation-service/UserDoesNotExistsError.error';

import { Left } from '@/shared/either';
import { z } from 'zod';

import { ICreateUserUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/users/create-user-use-case.dto.interface';
import { IReadUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/read-user-repository.dto.interface';
import { IUpdateUserUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/users/update-user-use-case.dto.interface';
import { IDeleteUserRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/delete-user-repository.dto.interface';
import { ISearchUsersRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/users/search-users-repository.dto.interface';
@Controller('users')
export class UsersV1Controller {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private readUserUseCase: ReadUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private searchUsersUseCase: SearchUsersUseCase,
  ) {}

  @Post()
  async createUser(
    @Req() request: Request,
    @Body() createUserUseCaseDto: ICreateUserUseCaseDto,
  ) {
    try {
      const eitherCreateUserUseCase = await this.createUserUseCase.execute(
        new CreateUserUseCaseDto(createUserUseCaseDto),
      );

      if (eitherCreateUserUseCase instanceof Left) {
        if (eitherCreateUserUseCase.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherCreateUserUseCase.value.errors };
        }

        if (eitherCreateUserUseCase.value instanceof UserAlreadyExistsError) {
          request.res?.status(409);
          return { message: eitherCreateUserUseCase.value.message };
        }

        if (eitherCreateUserUseCase.value instanceof RoleNotFoundError) {
          request.res?.status(404);
          return { message: eitherCreateUserUseCase.value.message };
        }

        throw eitherCreateUserUseCase.value;
      }

      request.res?.status(201);
      return eitherCreateUserUseCase.value.toJSON();
    } catch (error) {
      console.error('UsersV1Controller error: createUser');
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }

  @Get()
  async readUser(
    @Req() request: Request,
    @Query() readUserRepositoryDto: IReadUserRepositoryDto,
  ) {
    try {
      const eitherReadUserUseCase = await this.readUserUseCase.execute(
        new ReadUserRepositoryDto(readUserRepositoryDto),
      );

      if (eitherReadUserUseCase instanceof Left) {
        if (eitherReadUserUseCase.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherReadUserUseCase.value.errors };
        }

        throw eitherReadUserUseCase.value;
      }

      if (!eitherReadUserUseCase.value) {
        request.res?.status(404);
        return { message: 'User not found' };
      }

      request.res?.status(200);
      return eitherReadUserUseCase.value.toJSON();
    } catch (error) {
      console.error('UsersV1Controller error: readUser');
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }

  @Patch()
  async updateUser(
    @Req() request: Request,
    @Body() updateUserUseCaseDto: IUpdateUserUseCaseDto,
  ) {
    try {
      const eitherUpdateUserUseCase = await this.updateUserUseCase.execute(
        new UpdateUserUseCaseDto(updateUserUseCaseDto),
      );

      if (eitherUpdateUserUseCase instanceof Left) {
        if (eitherUpdateUserUseCase.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherUpdateUserUseCase.value.errors };
        }

        if (eitherUpdateUserUseCase.value instanceof UserAlreadyExistsError) {
          request.res?.status(409);
          return { message: eitherUpdateUserUseCase.value.message };
        }

        throw eitherUpdateUserUseCase.value;
      }

      request.res?.status(201);
      return eitherUpdateUserUseCase.value.toJSON();
    } catch (error) {
      console.log('error');
    }
  }

  @Delete()
  async deleteUser(
    @Req() request: Request,
    @Query() deleteUserRepositoryDto: IDeleteUserRepositoryDto,
  ) {
    try {
      const eitherDeleteUserUseCase = await this.deleteUserUseCase.execute(
        new DeleteUserRepositoryDto(deleteUserRepositoryDto),
      );

      if (eitherDeleteUserUseCase instanceof Left) {
        if (eitherDeleteUserUseCase.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherDeleteUserUseCase.value.errors };
        }

        if (eitherDeleteUserUseCase.value instanceof UserDoesNotExistsError) {
          request.res?.status(404);
          return { message: eitherDeleteUserUseCase.value.message };
        }

        throw eitherDeleteUserUseCase.value;
      }

      if (eitherDeleteUserUseCase.value === true) {
        request.res?.status(204);
        return;
      }

      request.res?.status(404);
      return { message: 'User not found' };
    } catch (error) {
      console.error('UsersV1Controller error: deleteUser');
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }

  @Get('search')
  async searchUsers(
    @Req() request: Request,
    @Query() searchUsersRepositoryDto: ISearchUsersRepositoryDto,
  ) {
    try {
      const eitherSearchUsersUseCase = await this.searchUsersUseCase.execute(
        new SearchUsersRepositoryDto(searchUsersRepositoryDto),
      );

      if (eitherSearchUsersUseCase instanceof Left) {
        if (eitherSearchUsersUseCase.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherSearchUsersUseCase.value.errors };
        }

        throw eitherSearchUsersUseCase.value;
      }

      if (!eitherSearchUsersUseCase.value) {
        request.res?.status(404);
        return { message: 'User not found' };
      }

      request.res?.status(200);
      return eitherSearchUsersUseCase.value.data.map((user) => user.toJSON());
    } catch (error) {
      console.error('UsersV1Controller error: searchUsers');
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }
}
