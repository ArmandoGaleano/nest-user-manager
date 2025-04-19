import { UserRolesModel } from '@/infrastructure/persistence/database-models/user_roles.model';

export type ICreateUserRoleUseCaseDto = Omit<
  UserRolesModel,
  'createdAt' | 'updatedAt'
>;
