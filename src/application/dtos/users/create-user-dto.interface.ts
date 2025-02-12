import { UserModel } from 'src/core/database-entities/user-model.interface';

export interface ICreateUserDto {
  email: UserModel['email'];
  password: UserModel['password'];
  firstName: UserModel['firstName'];
  lastName: UserModel['lastName'];
  birthdate: UserModel['birthdate'];
  role: UserModel['role'];
}
