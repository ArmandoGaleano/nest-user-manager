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
import { AbstractCreateRoleUseCase } from '@/core/abstractions/use-cases/roles/create-role-use-case.abstract';
import { Left } from '@/shared/either';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/core/errors/services/users/user-validation-service/UserAlreadyExistsError.error';
import { CreateRoleUseCaseDto } from '@/core/dtos/use-cases/roles/create-role-use-case.dto';

@Controller('roles')
export class RolesV1Controller {
  constructor(private createRoleUseCase: AbstractCreateRoleUseCase) {}

  @Post()
  async createRole(
    @Req() request: Request,
    @Body() createRoleDto: CreateRoleUseCaseDto,
  ) {
    try {
      const eitherCreateUserResult =
        await this.createRoleUseCase.execute(createRoleDto);

      if (eitherCreateUserResult instanceof Left) {
        if (eitherCreateUserResult.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherCreateUserResult.value.message };
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
}
