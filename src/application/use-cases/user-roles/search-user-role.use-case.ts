import { Injectable } from '@nestjs/common';

import { SearchUserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/search-user-role-repository.dto';

import { Either, Left, left, right } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { ISearchUserRoleUseCase } from '@/core/interfaces/application/use-cases/user-roles/search-user-role.use-case.interface';
import { UserRolesRepositoryService } from '@/infrastructure/persistence/repositories/user_roles/user-roles.repository.service';
import { UserRolesValidationService } from '@/application/services/user-roles/user-roles-validation-service/user-roles-validation.service';
import { UserRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/user-roles/user-role-repository.dto';

@Injectable()
export class SearchUserRoleUseCase implements ISearchUserRoleUseCase {
  constructor(
    private readonly userRoleRepositoryService: UserRolesRepositoryService,
    private readonly userRolesValidationService: UserRolesValidationService,
  ) {}

  public async execute(dto: SearchUserRoleRepositoryDto): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError,
      UserRoleRepositoryDto[]
    >
  > {
    try {
      // Validate repository DTO schema
      const eitherValidateCreateUserRoleDto =
        this.userRolesValidationService.validateSearchUserRoleRepositoryDtoSchema(
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
        await this.userRoleRepositoryService.searchUserRole(
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

      return right(
        eitherSearchUserRole.value.map(
          (userRole) => new UserRoleRepositoryDto(userRole),
        ),
      );
    } catch (error) {
      console.error('CreateUserRoleUseCase error when executing execute');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
