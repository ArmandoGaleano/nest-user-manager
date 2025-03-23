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

import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { CreateUserUseCaseDto } from '@/core/dtos/use-cases/users/create-user-use-case.dto';
@Controller('users')
export class UsersV1Controller {
  constructor(private createUserUseCase: AbstractCreateUserUseCase) {}

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
      return eitherCreateUserResult.value;
    } catch {
      console.log('error');
    }
  }

  // @Get()
  // async readUser(@Req() request: Request, @Query() readUserDto: ReadUserDto) {
  //   try {
  //     const httpResponse = await this.UsersV1Service.readUser(readUserDto);

  //     // Error
  //     if (httpResponse.result instanceof HttpError) {
  //       const { statusCode, message = '', data = null } = httpResponse.result;

  //       console.error('Controller error: readUser');
  //       console.error(message);
  //       const contentType = httpResponse.result.contentType;

  //       if (contentType === 'application/json') {
  //         request.res?.status(statusCode);

  //         return { data };
  //       }

  //       request.res?.status(statusCode);

  //       return { message };
  //     }

  //     // Success
  //     const { statusCode, data } = httpResponse.result;

  //     if (httpResponse.result.contentType) {
  //       request.res?.contentType(httpResponse.result.contentType);
  //     }

  //     request.res?.status(statusCode);

  //     return data;
  //   } catch (error) {
  //     console.error('Controller error: readUser');
  //     console.error(error);

  //     request.res?.status(500);
  //     return { message: 'Internal server error' };
  //   }
  // }

  // @Patch()
  // async updateUser(
  //   @Req() request: Request,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   try {
  //     const httpResponse = await this.UsersV1Service.updateUser(updateUserDto);

  //     if (httpResponse.result instanceof HttpError) {
  //       const { statusCode, message = '', data = null } = httpResponse.result;

  //       console.error('Controller error: updateUser');
  //       console.error(message);
  //       const contentType = httpResponse.result.contentType;

  //       if (contentType === 'application/json') {
  //         request.res?.status(statusCode);

  //         return { data };
  //       }

  //       request.res?.status(statusCode);

  //       return { message };
  //     }

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     const { statusCode, data } = httpResponse.result;

  //     request.res?.status(statusCode);

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //     return data;
  //   } catch (error) {
  //     console.error('Controller error: updateUser');
  //     console.error(error);

  //     request.res?.status(500);
  //     return { message: 'Internal server error' };
  //   }
  // }

  // @Delete()
  // async deleteUser(
  //   @Req() request: Request,
  //   @Query() deleteUserDto: DeleteUserDto,
  // ) {
  //   try {
  //     const httpResponse = await this.UsersV1Service.deleteUser(deleteUserDto);

  //     if (httpResponse.result instanceof HttpError) {
  //       const { statusCode, message = '', data = null } = httpResponse.result;

  //       console.error('Controller error: deleteUser');
  //       console.error(message);
  //       const contentType = httpResponse.result.contentType;

  //       if (contentType === 'application/json') {
  //         request.res?.status(statusCode);

  //         return { data };
  //       }

  //       request.res?.status(statusCode);

  //       return { message };
  //     }

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     const { statusCode, data } = httpResponse.result;
  //     request.res?.status(statusCode);
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //     return data;
  //   } catch (error) {
  //     console.error('Controller error: deleteUser');
  //     console.error(error);

  //     request.res?.status(500);
  //     return { message: 'Internal server error' };
  //   }
  // }
}
