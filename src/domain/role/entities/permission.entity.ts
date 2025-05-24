import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import {
  IPermissionEntity,
  PermissionPropsType,
} from '@/core/interfaces/domain/role/entities/permissions.interface';

export class Permission
  extends AbstractAutoSerializableClass<IPermissionEntity>
  implements IPermissionEntity
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

  constructor(private _props: PermissionPropsType) {
    super();
  }
}
