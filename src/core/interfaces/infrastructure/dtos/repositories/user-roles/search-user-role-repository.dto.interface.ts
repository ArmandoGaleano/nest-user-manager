import { UserRolesModel } from '@/infrastructure/persistence/database-models/user_roles.model';

export type ISearchUserRoleRepositoryDto = Optional<
  UserRolesModel,
  'user_id' | 'role_id' | 'createdAt' | 'updatedAt'
> & {
  createdAtStart?: UserRolesModel['createdAt'];
  createdAtEnd?: UserRolesModel['createdAt'];
  updatedAtStart?: UserRolesModel['updatedAt'];
  updatedAtEnd?: UserRolesModel['updatedAt'];
  page?: number;
  limit?: number;
};
