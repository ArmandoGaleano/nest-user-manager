import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';
import { IRoleEntity } from '../../../interfaces/domain/entities/roles/role.interface';
import { AbstractAutoSerializableClass } from '../../@base/auto-serializable-class.abstract';

export abstract class AbstractRoleEntity
  extends AbstractAutoSerializableClass<IRoleEntity>
  implements IRoleEntity
{
  abstract readonly id: RolesModel['id'];
  abstract name: RolesModel['name'];
  abstract createdAt: RolesModel['createdAt'];
  abstract updatedAt: RolesModel['updatedAt'];
}
