import { UserEntity } from 'src/core/entities/user-entity';
import { IUser } from './user.interface';

export class User implements UserEntity {
  id: UserEntity['id'];
  email: UserEntity['email'];
  password: UserEntity['password'];
  firstName: UserEntity['firstName'];
  lastName: UserEntity['lastName'];
  birthdate: UserEntity['birthdate'];
  role: UserEntity['role'];
  createdAt: UserEntity['createdAt'];
  updatedAt: UserEntity['updatedAt'];

  constructor({
    id,
    email,
    password,
    firstName,
    lastName,
    birthdate,
    role,
    createdAt,
    updatedAt,
  }: IUser) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validate() {
    return true;
  }
}
