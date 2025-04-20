import { Injectable } from '@nestjs/common';

import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';

import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';

import { SearchRolesRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/search-roles-repository.dto';

import { IReadRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';
import { IUpdateRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/update-role-repository.dto.interface';
import { IDeleteRoleRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/delete-role-repository.dto.interface';
import { ISearchRolesRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/search-roles-repository.dto.interface';

import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/create-role-repository.dto.abstract';
import { AbstractReadRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/read-role-repository.dto.abstract';
import { AbstractUpdateRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/update-role-repository.dto.abstract';
import { AbstractDeleteRoleRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/delete-role-repository.dto.abstract';
import { AbstractSearchRolesRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/roles/search-roles-repository.dto.abstract';

import { ReadRoleRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/roles/read-role-repository.dto';

import { CreateRoleRepositoryDtoSchema } from './schema/repository/create-role-repository.dto.schema';
import { ReadRoleRepositoryDtoSchema } from './schema/repository/read-role-repository.dto.schema';
import { UpdateRoleRepositoryDtoSchema } from './schema/repository/update-role-repository.dto.schema';
import { DeleteRoleRepositoryDtoSchema } from './schema/repository/delete-role-repository.dto.schema';
import { SearchRoleRepositoryDtoSchema } from './schema/repository/search-role-repository.dto.schema';

import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';

import { Either, Left, left, right } from '@/shared/either';
import { z } from 'zod';

import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleAlreadyExistError } from '@/core/errors/application/services/roles/roles-validation-service/RoleAlreadyExistError.error';
import { RoleNotFoundError } from '@/core/errors/application/services/roles/roles-validation-service/RoleNotFoundError.error';
@Injectable()
export class RolesValidationService extends AbstractRolesValidationService {
  constructor(private RolesRepositoryService: AbstractRolesRepositoryService) {
    super();
  }

  public validateCreateRoleSchema(dto: AbstractCreateRoleRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractCreateRoleRepositoryDto
  > {
    return this.validateDtoSchema<AbstractCreateRoleRepositoryDto>({
      currentMethodName: 'validateCreateRoleSchema',
      zodSchema: new CreateRoleRepositoryDtoSchema(),
      dto,
    });
  }
  public validateReadRoleSchema(dto: AbstractReadRoleRepositoryDto): Either<
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

  public validateUpdateRoleSchema(dto: AbstractUpdateRoleRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IUpdateRoleRepositoryDto
  > {
    return this.validateDtoSchema<IUpdateRoleRepositoryDto>({
      currentMethodName: 'validateUpdateRoleSchema',
      zodSchema: new UpdateRoleRepositoryDtoSchema(),
      dto,
    });
  }

  public validateDeleteRoleRepositoryDtoSchema(
    dto: AbstractDeleteRoleRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IDeleteRoleRepositoryDto
  > {
    return this.validateDtoSchema<IDeleteRoleRepositoryDto>({
      currentMethodName: 'deleteRoleDtoZodSchema',
      zodSchema: new DeleteRoleRepositoryDtoSchema(),
      dto,
    });
  }

  public validateSearchRolesRepositoryDtoSchema(
    dto: AbstractSearchRolesRepositoryDto,
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

  public async validateCreateRole(
    dto: AbstractCreateRoleRepositoryDto,
  ): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleAlreadyExistError,
      AbstractCreateRoleRepositoryDto
    >
  > {
    try {
      const eitherValidateRoleDto = this.validateCreateRoleSchema(dto);

      if (eitherValidateRoleDto instanceof Left) {
        return left(eitherValidateRoleDto.value);
      }

      const validateRoleDtoValue = eitherValidateRoleDto.value;

      const eitherRolesExists = await this.validateRolesExists([
        { name: validateRoleDtoValue.name },
      ]);

      if (eitherRolesExists instanceof Left) {
        if (eitherRolesExists.value instanceof InternalServerError) {
          throw eitherRolesExists.value;
        }

        return left(eitherRolesExists.value);
      }

      if (eitherRolesExists.value.exists) {
        return left(new RoleAlreadyExistError());
      }

      return right(validateRoleDtoValue);
    } catch (error) {
      console.error('RolesValidationService error: validateCreateRole');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public async validateUpdateRole(
    dto: AbstractUpdateRoleRepositoryDto,
  ): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | InternalServerError
      | RoleAlreadyExistError,
      IUpdateRoleRepositoryDto
    >
  > {
    try {
      const eitherValidateRoleDto = this.validateUpdateRoleSchema(dto);

      if (eitherValidateRoleDto instanceof Left) {
        return left(eitherValidateRoleDto.value);
      }

      const validateRoleDtoValue = eitherValidateRoleDto.value;

      if (typeof validateRoleDtoValue.name === 'string') {
        const eitherRolesExists = await this.validateRolesExists([
          { name: validateRoleDtoValue.name },
        ]);

        if (eitherRolesExists instanceof Left) {
          if (eitherRolesExists.value instanceof InternalServerError) {
            throw eitherRolesExists.value;
          }

          return left(eitherRolesExists.value);
        }

        if (eitherRolesExists.value.exists === true) {
          return left(new RoleAlreadyExistError());
        }
      }

      return right(validateRoleDtoValue);
    } catch (error) {
      console.error('RolesValidationService error: validateUpdateRole');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public async validateDeleteRole(
    dto: AbstractDeleteRoleRepositoryDto,
  ): Promise<
    Either<
      | z.ZodError<{
          [x: string]: any;
        }>
      | RoleNotFoundError
      | InternalServerError,
      IDeleteRoleRepositoryDto
    >
  > {
    try {
      const eitherDeleteRoleDto =
        this.validateDeleteRoleRepositoryDtoSchema(dto);

      if (eitherDeleteRoleDto instanceof Left) {
        return left(eitherDeleteRoleDto.value);
      }

      const eitherReadRole = await this.RolesRepositoryService.readRole(
        new ReadRoleRepositoryDto({
          id: eitherDeleteRoleDto.value.id,
        }),
      );

      if (eitherReadRole instanceof Left) {
        return left(eitherReadRole.value);
      }

      if (eitherReadRole.value === undefined) {
        return left(
          new RoleNotFoundError([{ id: eitherDeleteRoleDto.value.id }]),
        );
      }

      return right(eitherDeleteRoleDto.value);
    } catch (error) {
      console.error('RolesValidationService error: deleteRoleDto');
      console.error(error);

      return left(new InternalServerError());
    }
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
            await this.RolesRepositoryService.searchRoles(
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
