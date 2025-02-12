import { IUser } from '../domain/user/user.interface';

export abstract class UserEntity implements IUser {
  id: IUser['id'];
  email: IUser['email'];
  password: IUser['password'];
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
  birthdate: IUser['birthdate'];
  role: IUser['role'];
  createdAt: IUser['createdAt'];
  updatedAt: IUser['updatedAt'];
}
