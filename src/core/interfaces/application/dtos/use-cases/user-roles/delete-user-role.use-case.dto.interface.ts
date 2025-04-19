import { UserRolesModel } from '@/infrastructure/persistence/database-models/user_roles.model';

export type IDeleteUserRoleUseCaseDto = Omit<
  UserRolesModel,
  'createdAt' | 'updatedAt'
>;
