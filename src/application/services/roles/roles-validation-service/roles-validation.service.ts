import { AbstractRolesRepositoryService } from '@/core/abstractions/repositories/roles.repository.service.abstract';
import { AbstractRolesValidationService } from '@/core/abstractions/services/roles/roles-validation.service.abstract';

import { Either, Left, left, Right, right } from '@/shared/either';
import { z } from 'zod';

import { AbstractCreateRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/create-role-repository.dto.abstract';

import { createRoleDtoZodSchema } from './schema/create-role-dto-schema';

import { RoleAlreadyExistError } from '@/core/errors/services/roles/roles-validation-service/RoleAlreadyExistError.error';
import { InternalServerError } from '@/core/errors/InternalServerError.error';
import { RoleNotFoundError } from '@/core/errors/services/roles/roles-validation-service/RoleNotFoundError.error';
import { AbstractRoleRepositoryDto } from '@/core/abstractions/dtos/repositories/roles/role-repository.dto.abstract';
import { Injectable } from '@nestjs/common';
import { SearchRolesRepositoryDto } from '@/core/dtos/repositories/roles/search-roles-repository.dto';

@Injectable()
export class RolesValidationService extends AbstractRolesValidationService {
  constructor(private RolesRepositoryService: AbstractRolesRepositoryService) {
    super();
  }

  private validateDtoSchema<TDto>({
    currentMethodName,
    zodSchema,
    dto,
  }: {
    currentMethodName: string;
    zodSchema:
      | z.ZodObject<any, any>
      | z.ZodEffects<
          z.ZodObject<any>,
          {
            [x: string]: any;
          }
        >;
    dto: TDto;
  }): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    TDto
  > {
    try {
      const { data = {}, error } = zodSchema.safeParse(dto);

      if (error) {
        return left(error);
      }

      return right(data as TDto);
    } catch (error) {
      console.error(`${currentMethodName} error when executing validateDto`);
      console.error(error);

      return left(new InternalServerError());
    }
  }

  public validateCreateRoleSchema(dto: AbstractCreateRoleRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    AbstractCreateRoleRepositoryDto
  > {
    return this.validateDtoSchema<AbstractCreateRoleRepositoryDto>({
      currentMethodName: 'validateCreateRole',
      zodSchema: createRoleDtoZodSchema,
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
        validateRoleDtoValue.name,
      ]);

      if (eitherRolesExists instanceof Right) {
        return left(new RoleAlreadyExistError());
      }

      return right(validateRoleDtoValue);
    } catch (error) {
      console.error('RolesValidationService error: validateCreateRole');
      console.error(error);

      return left(new InternalServerError());
    }
  }

  async validateRolesExists(
    roles: Array<RolesModel['name']>,
  ): Promise<
    Either<InternalServerError | RoleNotFoundError, AbstractRoleRepositoryDto[]>
  > {
    try {
      const rolesPromise = await Promise.all(
        roles.map(async (role) => {
          const eitherSearchRolesResult =
            await this.RolesRepositoryService.searchRoles(
              new SearchRolesRepositoryDto({
                name: role,
              }),
            );

          if (eitherSearchRolesResult instanceof Left) {
            throw eitherSearchRolesResult.value;
          }

          if (eitherSearchRolesResult?.value?.length !== 1) {
            return null;
          }

          return eitherSearchRolesResult.value[0];
        }),
      );

      const nonExistentRolesIndexes = rolesPromise
        .map((role, index) => {
          if (!role) {
            return index;
          }

          return null;
        })
        ?.filter((index) => index !== null);

      if (nonExistentRolesIndexes.length) {
        const nonExistentRoles = nonExistentRolesIndexes.map(
          (index) => roles[index],
        );

        return left(new RoleNotFoundError(nonExistentRoles));
      }

      return right(rolesPromise as AbstractRoleRepositoryDto[]);
    } catch (error) {
      console.error('RolesValidationService error: validateRolesExists');
      console.error(error);

      return left(new InternalServerError());
    }
  }
}
