import { Injectable } from '@nestjs/common';

import { SearchRolesRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/search-roles-repository.dto';

import { Either, Left, left } from '@/shared/either';
import { z } from 'zod';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';
import { RolesValidationService } from '@/application/services/roles/roles-validation-service/roles-validation.service';
import { RoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/role-repository.dto';
import { ISearchRoleUseCase } from '@/core/interfaces/application/use-cases/roles/search-role.use-case.interface';

@Injectable()
export class SearchRoleUseCase implements ISearchRoleUseCase {
  constructor(
    private readonly roleRepositoryService: RolesRepositoryService,
    private readonly rolesValidationService: RolesValidationService,
  ) {}

  public async execute(dto: SearchRolesRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      RoleRepositoryDto[]
    >
  > {
    try {
      const eitherValidateRoleDto =
        await this.rolesValidationService.validateSearchRolesRepositoryDtoSchema(
          new SearchRolesRepositoryDto(dto),
        );

      if (eitherValidateRoleDto instanceof Left) {
        if (eitherValidateRoleDto.value instanceof InternalServerError) {
          throw eitherValidateRoleDto.value;
        }

        return left(eitherValidateRoleDto.value);
      }

      const eitherSearchRole = await this.roleRepositoryService.searchRoles(
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
