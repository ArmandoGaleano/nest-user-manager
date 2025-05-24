import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import {
  IRoleEntity,
  RolePropsType,
} from '@/core/interfaces/domain/role/entities/role.interface';

export class RoleEntity
  extends AbstractAutoSerializableClass<IRoleEntity>
  implements IRoleEntity
{
  get id() {
    return this._props.id;
  }
  get name() {
    return this._props.name;
  }
  get description() {
    return this._props.description;
  }
  get permissions() {
    return this._props.permissions;
  }

  constructor(private _props: RolePropsType) {
    super();
  }

  public hasPermission(permissionName: string): boolean {
    return this.permissions.some((p) => p.name === permissionName);
  }
}
