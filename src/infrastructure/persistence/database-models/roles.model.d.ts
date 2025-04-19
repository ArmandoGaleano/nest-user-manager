export enum EnumDefaultUserRoles {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export type RoleModelValueType =
  | EnumDefaultUserRoles.ADMIN
  | EnumDefaultUserRoles.CUSTOMER
  | string;

export interface RolesModel {
  id: string;
  name: RoleModelValueType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
