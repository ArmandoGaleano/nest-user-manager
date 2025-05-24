import { AbstractAutoSerializableClass } from '@/core/abstractions/@base/auto-serializable-class.abstract';
import { IUserEntity } from '@/core/interfaces/domain/user/entities/user.interface';

export class UserEntity
  extends AbstractAutoSerializableClass<IUserEntity>
  implements IUserEntity
{
  get id() {
    return this._props.id;
  }

  get email() {
    return this._props.email;
  }

  get firstName() {
    return this._props.firstName;
  }

  get lastName() {
    return this._props.lastName;
  }

  get birthdate() {
    return this._props.birthdate;
  }

  get roles() {
    return this._props.roles;
  }

  get createdAt() {
    return this._props.createdAt;
  }

  get updatedAt() {
    return this._props.updatedAt;
  }

  set updatedAt(timestamp: number) {
    this._props.updatedAt = timestamp;
  }

  constructor(private _props: IUserEntity) {
    super();
  }
}
