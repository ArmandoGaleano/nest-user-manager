import { Body, Controller, Post, Get, Query, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { UsersV1Service } from 'src/application/services/users/v1/users.service';
import { Request } from 'express';
import { knex } from 'src/infrastructure/persistence/knex';
import { HttpError } from 'src/infrastructure/http/HttpError';
import { ReadUserDto } from 'src/application/dtos/users/read-user.dto';

@Controller('users')
export class UsersV1Controller {
  constructor(private readonly UsersV1Service: UsersV1Service) {}

  @Post()
  async createUser(
    @Req() request: Request,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const httpResponse = await this.UsersV1Service.create(createUserDto);

      if (httpResponse.result instanceof HttpError) {
        const { statusCode, message = '', data = null } = httpResponse.result;

        console.error('Controller error: createUser');
        console.error(message);
        const contentType = httpResponse.result.contentType;

        if (contentType === 'application/json') {
          request.res?.status(statusCode);

          return { data };
        }

        request.res?.status(statusCode);

        return { message };
      }

      const { statusCode, data } = httpResponse.result;

      return request.res?.status(statusCode).send(data);
    } catch (error) {
      console.error('Controller error: createUser');
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }

  @Get()
  async readUser(@Req() request: Request, @Query() readUserDto: ReadUserDto) {
    try {
      const httpResponse = await this.UsersV1Service.read(readUserDto);

      if (httpResponse.result instanceof HttpError) {
        const { statusCode, message = '', data = null } = httpResponse.result;

        console.error('Controller error: readUser');
        console.error(message);
        const contentType = httpResponse.result.contentType;

        if (contentType === 'application/json') {
          request.res?.status(statusCode);

          return { data };
        }

        request.res?.status(statusCode);

        return { message };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { statusCode, data } = httpResponse.result;

      if (httpResponse.result.contentType) {
        request.res?.contentType(httpResponse.result.contentType);
      }

      request.res?.status(statusCode);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data;
    } catch (error) {
      console.error('Controller error: readUser');
      console.error(error);

      request.res?.status(500);
      return { message: 'Internal server error' };
    }
  }
}
