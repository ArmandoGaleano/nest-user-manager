import { IRoleEntity } from '../interfaces/entities/roles/role.interface';

export abstract class AbstractRoleEntity implements IRoleEntity {
  abstract readonly id: RolesModel['id'];
  abstract name: RolesModel['name'];
  abstract createdAt: RolesModel['createdAt'];
  abstract updatedAt: RolesModel['updatedAt'];
}
