enum EnumDefaultUserRoles {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
type RoleModelValueType =
  | EnumDefaultUserRoles.ADMIN
  | EnumDefaultUserRoles.CUSTOMER
  | string;

interface RolesModel {
  id: string;
  name: RoleModelValueType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
