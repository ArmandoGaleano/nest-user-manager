import { Controller, Get, Req, Query } from '@nestjs/common';
import { Request } from 'express';

import { SearchUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/search-user-role-repository.dto';

import { Left } from '@/shared/either';
import { z } from 'zod';

import { SearchUserRoleUseCase } from '@/application/use-cases/user-roles/search-user-role.use-case';
import { ISearchUserRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/user-roles/search-user-role-repository.dto.interface';

@Controller('user-roles')
export class UserRolesV1Controller {
  constructor(private readonly searchUserRoleUseCase: SearchUserRoleUseCase) {}

  @Get('search')
  async searchUserRoles(
    @Req() request: Request,
    @Query() searchUserRoleRepositoryDto: ISearchUserRoleRepositoryDto,
  ) {
    try {
      const eitherSearchUserRoleUseCase =
        await this.searchUserRoleUseCase.execute(
          new SearchUserRoleRepositoryDto(searchUserRoleRepositoryDto),
        );

      if (eitherSearchUserRoleUseCase instanceof Left) {
        if (eitherSearchUserRoleUseCase.value instanceof z.ZodError) {
          request.res?.status(400);
          return { messages: eitherSearchUserRoleUseCase.value.message };
        }

        throw eitherSearchUserRoleUseCase.value;
      }

      return eitherSearchUserRoleUseCase.value;
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
