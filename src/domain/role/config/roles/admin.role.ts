import { RoleEntity } from '@/domain/role/entities/role.entity';
import { USER_PERMISSIONS } from '../permissions/users.permissions';
import { Uuid } from '@/shared/value-objects/Uuid';

export const ADMIN_ROLE = new RoleEntity({
  id: new Uuid('cfec9198-91aa-4561-98bc-ea8f353d8586'),
  name: 'ADMIN',
  description: 'Administrator role with full access',
  permissions: [...Object.values(USER_PERMISSIONS)],
});
