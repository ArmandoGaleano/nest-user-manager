import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';

export type IValidateCreateUserDto = UsersModel & {
  roles: Array<RolesModel['name']>;
};
