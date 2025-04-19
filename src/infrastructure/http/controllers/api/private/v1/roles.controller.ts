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
import { AbstractCreateRoleUseCase } from '@/core/abstractions/application/use-cases/roles/create-role.use-case.abstract';

import { AbstractReadRoleUseCase } from '@/core/abstractions/application/use-cases/roles/read-role.use-case.abstract';

import { Left } from '@/shared/either';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/core/errors/application/services/users/user-validation-service/UserAlreadyExistsError.error';

import { AbstractUpdateRoleUseCase } from '@/core/abstractions/application/use-cases/roles/update-role.use-case.abstract';
import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';
import { AbstractDeleteRoleUseCase } from '@/core/abstractions/application/use-cases/roles/delete-role.use-case.abstract';

import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';

import { AbstractSearchRoleUseCase } from '@/core/abstractions/application/use-cases/roles/search-role.use-case.abstract';
import { UpdateRoleUseCaseDto } from '@/application/dtos/use-cases/roles/update-role-use-case.dto';
import { CreateRoleUseCaseDto } from '@/application/dtos/use-cases/roles/create-role-use-case.dto';
import { ICreateRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/roles/create-role-use-case.dto.interface';
import { IReadRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';
import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';
import { IUpdateRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/roles/update-role-use-case.dto.interface';
import { IDeleteRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/delete-role-repository.dto.interface';
import { DeleteRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/delete-role-repository.dto';
import { ISearchRolesRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/search-roles-repository.dto.interface';
import { SearchRolesRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/search-roles-repository.dto';
@Controller('roles')
export class RolesV1Controller {
  constructor(
    private readonly CreateRoleUseCase: AbstractCreateRoleUseCase,
    private readonly ReadRoleUseCase: AbstractReadRoleUseCase,
    private readonly UpdateRoleUseCase: AbstractUpdateRoleUseCase,
    private readonly DeleteRoleUseCase: AbstractDeleteRoleUseCase,
    private readonly SearchRoleUseCase: AbstractSearchRoleUseCase,
  ) {}

  @Post()
  async createRole(
    @Req() request: Request,
    @Body() createRoleDto: ICreateRoleUseCaseDto,
  ) {
    try {
      const eitherCreateUserResult = await this.CreateRoleUseCase.execute(
        new CreateRoleUseCaseDto(createRoleDto),
      );

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
      return eitherCreateUserResult.value.toJSON();
    } catch (error) {
      console.error('CreateRoleController error: execute');
      console.error(error);

      return {
        message: 'Internal server error',
      };
    }
  }

  @Get()
  async readRole(
    @Req() request: Request,
    @Query() readRoleRepositoryDto: IReadRoleRepositoryDto,
  ) {
    try {
      const eitherReadUserResult = await this.ReadRoleUseCase.execute(
        new ReadRoleRepositoryDto(readRoleRepositoryDto),
      );

      if (eitherReadUserResult instanceof Left) {
        if (eitherReadUserResult.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherReadUserResult.value.message };
        }

        request.res?.status(500);
        return { message: eitherReadUserResult.value.message };
      }

      request.res?.status(200);
      if (eitherReadUserResult.value) {
        return eitherReadUserResult.value.toJSON();
      }

      return undefined;
    } catch (error) {
      console.error('ReadRoleController error: execute');
      console.error(error);

      return {
        message: 'Internal server error',
      };
    }
  }

  @Patch()
  async updateRole(
    @Req() request: Request,
    @Body() updateRoleUseCaseDto: IUpdateRoleUseCaseDto,
  ) {
    try {
      const eitherUpdateRoleResult = await this.UpdateRoleUseCase.execute(
        new UpdateRoleUseCaseDto(updateRoleUseCaseDto),
      );

      if (eitherUpdateRoleResult instanceof Left) {
        if (eitherUpdateRoleResult.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherUpdateRoleResult.value.message };
        }

        if (eitherUpdateRoleResult.value instanceof RoleAlreadyExistError) {
          request.res?.status(409);
          return { message: eitherUpdateRoleResult.value.message };
        }

        request.res?.status(500);
        return { message: eitherUpdateRoleResult.value.message };
      }

      request.res?.status(201);

      return eitherUpdateRoleResult.value.toJSON();
    } catch (error) {
      console.error('UpdateRoleController error: execute');
      console.error(error);

      return {
        message: 'Internal server error',
      };
    }
  }

  @Delete()
  async deleteRole(
    @Req() request: Request,
    @Query() deleteRoleUseCaseDto: IDeleteRoleRepositoryDto,
  ) {
    try {
      const eitherDeleteRoleResult = await this.DeleteRoleUseCase.execute(
        new DeleteRoleRepositoryDto(deleteRoleUseCaseDto),
      );

      if (eitherDeleteRoleResult instanceof Left) {
        if (eitherDeleteRoleResult.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherDeleteRoleResult.value.message };
        }

        if (eitherDeleteRoleResult.value instanceof RoleNotFoundError) {
          request.res?.status(404);
          return { message: eitherDeleteRoleResult.value.message };
        }

        request.res?.status(500);
        return { message: eitherDeleteRoleResult.value.message };
      }
      if (eitherDeleteRoleResult.value === false) {
        request.res?.status(404);
        return { message: 'Role not found' };
      }

      return eitherDeleteRoleResult.value;
    } catch (error) {
      console.error('DeleteRoleController error: execute');
      console.error(error);

      return {
        message: 'Internal server error',
      };
    }
  }

  @Get('search')
  async searchRoles(
    @Req() request: Request,
    @Query() deleteRoleUseCaseDto: ISearchRolesRepositoryDto,
  ) {
    try {
      const eitherSearchRolesResult = await this.SearchRoleUseCase.execute(
        new SearchRolesRepositoryDto(deleteRoleUseCaseDto),
      );

      if (eitherSearchRolesResult instanceof Left) {
        if (eitherSearchRolesResult.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherSearchRolesResult.value.message };
        }

        throw eitherSearchRolesResult.value;
      }

      return eitherSearchRolesResult.value.map((role) => role.toJSON());
    } catch (error) {
      console.error('SearchRolesController error: execute');
      console.error(error);

      request.res?.status(500);
      return {
        message: 'Internal server error',
      };
    }
  }
}
