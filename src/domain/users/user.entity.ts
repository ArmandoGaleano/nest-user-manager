import { AbstractUserEntity } from '@/core/abstractions/entities/user.abstract';
import { IUserEntity } from '@/core/interfaces/entities/users/user.interface';

export class UserEntity extends AbstractUserEntity {
  get id() {
    return this.props.id;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get birthdate() {
    return this.props.birthdate;
  }

  get roles() {
    return this.props.roles;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set updatedAt(date: Date) {
    this.props.updatedAt = date;
  }

  constructor(private props: IUserEntity) {
    super();
  }
}
