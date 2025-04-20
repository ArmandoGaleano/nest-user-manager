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
import { AbstractUpdateRoleUseCase } from '@/core/abstractions/application/use-cases/roles/update-role.use-case.abstract';
import { AbstractDeleteRoleUseCase } from '@/core/abstractions/application/use-cases/roles/delete-role.use-case.abstract';
import { AbstractSearchRoleUseCase } from '@/core/abstractions/application/use-cases/roles/search-role.use-case.abstract';

import { ICreateRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/roles/create-role-use-case.dto.interface';
import { IReadRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';
import { IUpdateRoleUseCaseDto } from '@/core/interfaces/application/dtos/use-cases/roles/update-role-use-case.dto.interface';
import { IDeleteRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/delete-role-repository.dto.interface';
import { ISearchRolesRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/search-roles-repository.dto.interface';

import { CreateRoleUseCaseDto } from '@/application/dtos/use-cases/roles/create-role-use-case.dto';
import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';
import { UpdateRoleUseCaseDto } from '@/application/dtos/use-cases/roles/update-role-use-case.dto';
import { DeleteRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/delete-role-repository.dto';
import { SearchRolesRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/search-roles-repository.dto';

import { Left } from '@/shared/either';
import { z } from 'zod';

import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
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
    @Body() createRoleUseCaseDto: ICreateRoleUseCaseDto,
  ) {
    try {
      const eitherCreateRoleUseCase = await this.CreateRoleUseCase.execute(
        new CreateRoleUseCaseDto(createRoleUseCaseDto),
      );

      if (eitherCreateRoleUseCase instanceof Left) {
        if (eitherCreateRoleUseCase.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherCreateRoleUseCase.value.message };
        }

        if (eitherCreateRoleUseCase.value instanceof RoleAlreadyExistError) {
          request.res?.status(409);
          return { message: eitherCreateRoleUseCase.value.message };
        }

        throw eitherCreateRoleUseCase.value;
      }

      request.res?.status(201);
      return eitherCreateRoleUseCase.value.toJSON();
    } catch (error) {
      console.error('CreateRoleController error: execute');
      console.error(error);

      request.res?.status(500);
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
      const eitherReadRoleUseCase = await this.ReadRoleUseCase.execute(
        new ReadRoleRepositoryDto(readRoleRepositoryDto),
      );

      if (eitherReadRoleUseCase instanceof Left) {
        if (eitherReadRoleUseCase.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherReadRoleUseCase.value.message };
        }

        throw eitherReadRoleUseCase.value;
      }

      if (eitherReadRoleUseCase.value) {
        request.res?.status(200);
        return eitherReadRoleUseCase.value.toJSON();
      }

      request.res?.status(404);
      return { message: 'Role not found' };
    } catch (error) {
      console.error('ReadRoleController error: execute');
      console.error(error);

      request.res?.status(500);
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
      const eitherUpdateRoleUseCase = await this.UpdateRoleUseCase.execute(
        new UpdateRoleUseCaseDto(updateRoleUseCaseDto),
      );

      if (eitherUpdateRoleUseCase instanceof Left) {
        if (eitherUpdateRoleUseCase.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherUpdateRoleUseCase.value.message };
        }

        if (eitherUpdateRoleUseCase.value instanceof RoleAlreadyExistError) {
          request.res?.status(409);
          return { message: eitherUpdateRoleUseCase.value.message };
        }

        throw eitherUpdateRoleUseCase.value;
      }

      request.res?.status(201);
      return eitherUpdateRoleUseCase.value.toJSON();
    } catch (error) {
      console.error('UpdateRoleController error: execute');
      console.error(error);

      request.res?.status(500);
      return {
        message: 'Internal server error',
      };
    }
  }

  @Delete()
  async deleteRole(
    @Req() request: Request,
    @Query() deleteRoleRepositoryDto: IDeleteRoleRepositoryDto,
  ) {
    try {
      const eitherDeleteRoleUseCase = await this.DeleteRoleUseCase.execute(
        new DeleteRoleRepositoryDto(deleteRoleRepositoryDto),
      );

      if (eitherDeleteRoleUseCase instanceof Left) {
        if (eitherDeleteRoleUseCase.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherDeleteRoleUseCase.value.message };
        }

        if (eitherDeleteRoleUseCase.value instanceof RoleNotFoundError) {
          request.res?.status(404);
          return { message: eitherDeleteRoleUseCase.value.message };
        }

        throw eitherDeleteRoleUseCase.value;
      }

      if (eitherDeleteRoleUseCase.value === false) {
        request.res?.status(404);
        return { message: 'Role not found' };
      }

      request.res?.status(204);
      return;
    } catch (error) {
      console.error('DeleteRoleController error: execute');
      console.error(error);

      request.res?.status(500);
      return {
        message: 'Internal server error',
      };
    }
  }

  @Get('search')
  async searchRoles(
    @Req() request: Request,
    @Query() searchRolesRepositoryDto: ISearchRolesRepositoryDto,
  ) {
    try {
      const eitherSearchRoleUseCase = await this.SearchRoleUseCase.execute(
        new SearchRolesRepositoryDto(searchRolesRepositoryDto),
      );

      if (eitherSearchRoleUseCase instanceof Left) {
        if (eitherSearchRoleUseCase.value instanceof z.ZodError) {
          request.res?.status(400);

          return { messages: eitherSearchRoleUseCase.value.message };
        }

        throw eitherSearchRoleUseCase.value;
      }

      return eitherSearchRoleUseCase.value.map((role) => role.toJSON());
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
