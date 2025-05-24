import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';
import { UsersModel } from '@/infrastructure/persistence/database-models/users.model';

export type IValidateCreateUserDto = UsersModel & {
  roles: Array<RolesModel['name']>;
};
