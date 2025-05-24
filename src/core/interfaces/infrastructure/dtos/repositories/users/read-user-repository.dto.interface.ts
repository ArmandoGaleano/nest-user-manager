import { UsersModel } from '@/infrastructure/persistence/database-models/users.model';

export interface IReadUserRepositoryDto {
  id?: UsersModel['id'];
  email?: UsersModel['email'];
}
