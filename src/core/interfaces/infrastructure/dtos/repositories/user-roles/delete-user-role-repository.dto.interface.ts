import { UserRolesModel } from '@/infrastructure/persistence/database-models/user_roles.model';

export type IDeleteUserRoleRepositoryDto = Pick<
  UserRolesModel,
  'role_id' | 'user_id'
>;
