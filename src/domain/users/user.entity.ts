import { AbstractUserEntity } from '@/core/abstractions/domain/entities/user.abstract';
import { IUserEntity } from '@/core/interfaces/domain/entities/users/user.interface';

export class UserEntity extends AbstractUserEntity {
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

  set updatedAt(date: Date) {
    this._props.updatedAt = date;
  }

  constructor(private _props: IUserEntity) {
    super();
  }
}
