import { z } from 'zod';
import { Either } from '@/shared/either';

import { IReadRoleRepositoryDto } from '../../../infrastructure/dtos/repositories/roles/read-role-repository.dto.interface';
import { ISearchRolesRepositoryDto } from '@/core/interfaces/infrastructure/dtos/repositories/roles/search-roles-repository.dto.interface';
import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';

import { InternalServerError } from '@/core/errors/InternalServerError.error';

export interface IRolesValidationService {
  validateReadRoleSchema(dto: IReadRoleRepositoryDto): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    IReadRoleRepositoryDto
  >;

  validateSearchRolesRepositoryDtoSchema(
    dto: ISearchRolesRepositoryDto,
  ): Either<
    | z.ZodError<{
        [x: string]: any;
      }>
    | InternalServerError,
    ISearchRolesRepositoryDto
  >;

  validateRolesExists(
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
  >;
}
