import { Injectable } from '@nestjs/common';
import { AbstractSearchRoleUseCase } from '@/core/abstractions/application/use-cases/roles/search-role.use-case.abstract';

import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';
import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';

import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/search-roles-repository.dto.abstract';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/role-repository.dto.abstract';
import { SearchRolesRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/search-roles-repository.dto';

import { Either, Left, left } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';

@Injectable()
export class SearchRoleUseCase extends AbstractSearchRoleUseCase {
  constructor(
    private readonly RoleRepositoryService: AbstractRolesRepositoryService,
    private readonly RolesValidationService: AbstractRolesValidationService,
  ) {
    super();
  }

  public async execute(dto: AbstractSearchRolesRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractRoleRepositoryDto[]
    >
  > {
    try {
      const eitherValidateRoleDto =
        await this.RolesValidationService.validateSearchRolesRepositoryDtoSchema(
          new SearchRolesRepositoryDto(dto),
        );

      if (eitherValidateRoleDto instanceof Left) {
        if (eitherValidateRoleDto.value instanceof InternalServerError) {
          throw eitherValidateRoleDto.value;
        }

        return left(eitherValidateRoleDto.value);
      }

      const eitherSearchRole = await this.RoleRepositoryService.searchRoles(
        new SearchRolesRepositoryDto(eitherValidateRoleDto.value),
      );

      if (eitherSearchRole instanceof Left) {
        throw eitherSearchRole.value;
      }

      return eitherSearchRole;
    } catch (error) {
      console.error('SearchRoleUseCase error when executing execute');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
