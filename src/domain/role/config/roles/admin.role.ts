import { RoleEntity } from '@/domain/role/entities/role.entity';
import { USER_PERMISSIONS } from '../permissions/users.permissions';

export const ADMIN_ROLE = new RoleEntity({
  name: 'admin',
  description: 'Administrator role with full access',
  permissions: [...Object.values(USER_PERMISSIONS)],
});
