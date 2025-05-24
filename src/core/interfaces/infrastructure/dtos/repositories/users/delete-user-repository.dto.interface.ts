import { UsersModel } from '@/infrastructure/persistence/database-models/users.model';

export interface IDeleteUserRepositoryDto {
  id: UsersModel['id'];
}
