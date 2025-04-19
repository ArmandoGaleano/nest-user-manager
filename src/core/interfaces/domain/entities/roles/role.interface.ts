import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';

export interface IRoleEntity {
  id: RolesModel['id'];
  name: RolesModel['name'];
  createdAt: RolesModel['createdAt'];
  updatedAt: RolesModel['updatedAt'];
}
