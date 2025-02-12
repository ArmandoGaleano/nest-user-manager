import { UserRole } from './user-role.enum';

export interface UserModel {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
