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

import { AbstractCreateUserUseCase } from '@/core/abstractions/use-cases/users/create-user.use-case.abstract';
import { AbstractReadUserUseCase } from '@/core/abstractions/use-cases/users/read-user.use-case.abstract';
import { AbstractUpdateUserUseCase } from '@/core/abstractions/use-cases/users/update-user.use-case.abstract';
import { AbstractDeleteUserUseCase } from '@/core/abstractions/use-cases/users/delete-user.use-case.abstract';

import { CreateUserUseCaseDto } from '@/core/dtos/use-cases/users/create-user-use-case.dto';
import { ReadUserRepositoryDto } from '@/core/dtos/repositories/users/read-user-repository.dto';
import { UpdateUserUseCaseDto } from '@/core/dtos/use-cases/users/update-user-use-case.dto';
import { DeleteUserRepositoryDto } from '@/core/dtos/repositories/users/delete-user-repository.dto';

import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
@Controller('users')
export class UsersV1Controller {
  constructor(
    private createUserUseCase: AbstractCreateUserUseCase,
    private readUserUseCase: AbstractReadUserUseCase,
    private updateUserUseCase: AbstractUpdateUserUseCase,
    private deleteUserUseCase: AbstractDeleteUserUseCase,
  ) {}

  @Post()
  async createUser(
    @Req() request: Request,
    @Body() createUserDto: CreateUserUseCaseDto,
  ) {
    try {
      const eitherCreateUserResult =
        await this.createUserUseCase.execute(createUserDto);

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
        id: eitherCreateUserResult.value.id,
        email: eitherCreateUserResult.value.email,
        password: eitherCreateUserResult.value.password,
        firstName: eitherCreateUserResult.value.firstName,
        lastName: eitherCreateUserResult.value.lastName,
        birthdate: eitherCreateUserResult.value.birthdate,
        roles: eitherCreateUserResult.value.roles.map((role) => ({
          id: role.id,
          name: role.name,
          description: role.description,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt,
        })),
        createdAt: eitherCreateUserResult.value.createdAt,
        updatedAt: eitherCreateUserResult.value.updatedAt,
      };
    } catch {
      console.log('error');
    }
  }

  @Get()
  async readUser(
    @Req() request: Request,
    @Query() readUserDto: ReadUserRepositoryDto,
  ) {
    try {
      const eitherReadUserResult =
        await this.readUserUseCase.execute(readUserDto);

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
    @Body() updateUserDto: UpdateUserUseCaseDto,
  ) {
    try {
      const eitherCreateUserResult =
        await this.updateUserUseCase.execute(updateUserDto);

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
    @Query() deleteUserDto: DeleteUserRepositoryDto,
  ) {
    try {
      const eitherDeleteUserResult =
        await this.deleteUserUseCase.execute(deleteUserDto);

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
}
