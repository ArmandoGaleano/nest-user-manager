import { Injectable } from '@nestjs/common';

import { SearchRolesRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/search-roles-repository.dto';

import { IReadRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';

import { ISearchRolesRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/search-roles-repository.dto.interface';

import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';

import { ReadRoleRepositoryDtoSchema } from './schema/repository/read-role-repository.dto.schema';

import { SearchRoleRepositoryDtoSchema } from './schema/repository/search-role-repository.dto.schema';

import { IRolesValidationService } from '@/core/interfaces/application/services/roles/roles-validation.service.interface';
import { Either, Left, left, right } from '@/shared/either';
import { z } from 'zod';
import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { AbstractValidationService } from '@/core/abstractions/@base/validation-service.abstract';
import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';
@Injectable()
export class RolesValidationService
  extends AbstractValidationService
  implements IRolesValidationService
{
  constructor(private rolesRepositoryService: RolesRepositoryService) {
    super();
  }

  public validateReadRoleSchema(dto: IReadRoleRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IReadRoleRepositoryDto
  > {
    return this.validateDtoSchema<IReadRoleRepositoryDto>({
      currentMethodName: 'validateReadRoleSchema',
      zodSchema: new ReadRoleRepositoryDtoSchema(),
      dto,
    });
  }

  public validateSearchRolesRepositoryDtoSchema(
    dto: ISearchRolesRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ISearchRolesRepositoryDto
  > {
    return this.validateDtoSchema<ISearchRolesRepositoryDto>({
      currentMethodName: 'validateSearchRolesRepositoryDtoSchema',
      zodSchema: new SearchRoleRepositoryDtoSchema(),
      dto,
    });
  }

  async validateRolesExists(
    roles: Array<{
      id?: RolesModel['id'];
      name?: RolesModel['name'];
    }>,
  ): Promise<
    Either<
      InternalServerError,
      | {
          exists: false;
          nonExistentRoles: Array<{
            id?: RolesModel['id'];
            name?: RolesModel['name'];
          }>;
        }
      | { exists: true }
    >
  > {
    if (roles?.some((role) => !role?.name?.length && !role?.id?.length)) {
      throw new Error(
        'RolesValidationService: validateRolesExists: roles must have at least one name or id',
      );
    }

    try {
      const rolesPromise = await Promise.all(
        roles.map(async ({ id, name }) => {
          const eitherSearchRolesResult =
            await this.rolesRepositoryService.searchRoles(
              new SearchRolesRepositoryDto({
                id,
                name,
                enableExactSearch: true,
              }),
            );

          if (eitherSearchRolesResult instanceof Left) {
            throw eitherSearchRolesResult.value;
          }

          if (eitherSearchRolesResult?.value?.length !== 1) {
            return null;
          }

          return eitherSearchRolesResult?.value[0];
        }),
      );

      const nonExistentRolesIndexes = rolesPromise
        .map((role, index) => {
          if (!role) {
            return index;
          }

          return null;
        })
        .filter((index) => index !== null);

      if (nonExistentRolesIndexes.length) {
        const nonExistentRoles = nonExistentRolesIndexes.map(
          (index) => roles[index],
        );

        return right({
          exists: false,
          nonExistentRoles,
        });
      }

      return right({ exists: true });
    } catch (error) {
      console.error('RolesValidationService error: validateRolesExists');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
