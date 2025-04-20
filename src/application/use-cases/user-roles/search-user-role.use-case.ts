import { Injectable } from '@nestjs/common';

import { AbstractSearchUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/search-user-role.use-case.abstract';

import { AbstractUserRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/user-roles.repository.service.abstract';
import { AbstractUserRolesValidationService } from '@/core/abstractions/application/services/user-roles/user-roles-validation.service.abstract';

import { AbstractSearchUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/search-user-role.dto.abstract';
import { AbstractUserRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/user-roles/user-role-repository.dto.abstract';
import { SearchUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/search-user-role-repository.dto';

import { Either, Left, left, right } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';

@Injectable()
export class SearchUserRoleUseCase extends AbstractSearchUserRoleUseCase {
  constructor(
    private readonly UserRoleRepositoryService: AbstractUserRolesRepositoryService,
    private readonly UserRolesValidationService: AbstractUserRolesValidationService,
  ) {
    super();
  }

  public async execute(dto: AbstractSearchUserRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      AbstractUserRoleRepositoryDto[]
    >
  > {
    try {
      // Validate repository DTO schema
      const eitherValidateCreateUserRoleDto =
        this.UserRolesValidationService.validateSearchUserRoleRepositoryDtoSchema(
          dto,
        );

      if (eitherValidateCreateUserRoleDto instanceof Left) {
        if (
          eitherValidateCreateUserRoleDto.value instanceof InternalServerError
        ) {
          throw eitherValidateCreateUserRoleDto.value;
        }

        return left(eitherValidateCreateUserRoleDto.value);
      }

      // search user roles
      const eitherSearchUserRole =
        await this.UserRoleRepositoryService.searchUserRole(
          new SearchUserRoleRepositoryDto(
            eitherValidateCreateUserRoleDto.value,
          ),
        );

      if (eitherSearchUserRole instanceof Left) {
        if (eitherSearchUserRole.value instanceof InternalServerError) {
          throw eitherSearchUserRole.value;
        }

        return left(eitherSearchUserRole.value);
      }

      return right(eitherSearchUserRole.value);
    } catch (error) {
      console.error('CreateUserRoleUseCase error when executing execute');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
