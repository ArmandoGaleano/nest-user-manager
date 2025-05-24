import { Uuid } from '@/shared/value-objects/Uuid';

export type PermissionPropsType = {
  id?: Uuid;
  name: string; // ex: 'READ', 'WRITE', 'DELETE'
  description?: string; // ex: 'Can read data', 'Can write data', 'Can delete data'
};

export type IPermissionEntity = PermissionPropsType;
