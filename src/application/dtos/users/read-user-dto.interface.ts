import { UserModel } from 'src/core/database-entities/user-model.interface';

export interface IReadUserDto {
  id?: UserModel['id'];
  email?: UserModel['email'];
}
