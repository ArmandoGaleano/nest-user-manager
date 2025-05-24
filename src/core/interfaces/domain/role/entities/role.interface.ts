import { Uuid } from '@/shared/value-objects/Uuid';
import { Permission } from '@/domain/role/entities/permission.entity';

export type RolePropsType = {
  id?: Uuid;
  name: string; // 'ADMIN', 'RESTRICTED_ADMIN', 'USER', etc.
  description: string; // 'Administrator', 'Restricted Administrator', 'Standard user', etc.
  permissions: Permission[];
};
export interface IRoleEntity extends RolePropsType {
  hasPermission(permissionName: string): boolean;
}
