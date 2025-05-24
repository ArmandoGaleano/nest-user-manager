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

import { IReadRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';

import { ISearchRolesRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/search-roles-repository.dto.interface';

import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';

import { SearchRolesRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/search-roles-repository.dto';

import { Left } from '@/shared/either';
import { z } from 'zod';

import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
import { ReadRoleUseCase } from '@/application/use-cases/roles/read-role.use-case';
import { SearchRoleUseCase } from '@/application/use-cases/roles/search-role.use-case';
@Controller('roles')
export class RolesV1Controller {
  constructor(
    private readonly readRoleUseCase: ReadRoleUseCase,
    private readonly searchRoleUseCase: SearchRoleUseCase,
  ) {}

  @Get()
  async readRole(
    @Req() request: Request,
    @Query() readRoleRepositoryDto: IReadRoleRepositoryDto,
  ) {
    try {
      const eitherReadRoleUseCase = await this.readRoleUseCase.execute(
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

  @Get('search')
  async searchRoles(
    @Req() request: Request,
    @Query() searchRolesRepositoryDto: ISearchRolesRepositoryDto,
  ) {
    try {
      const eitherSearchRoleUseCase = await this.searchRoleUseCase.execute(
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
