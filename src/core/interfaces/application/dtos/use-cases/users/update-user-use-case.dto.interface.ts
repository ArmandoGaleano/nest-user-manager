import { UsersModel } from '@/infrastructure/persistence/database-models/users.model';

export interface IUpdateUserUseCaseDto {
  id: UsersModel['id'];
  password?: UsersModel['password'];
  firstName?: UsersModel['firstName'];
  lastName?: UsersModel['lastName'];
  birthdate?: UsersModel['birthdate'];
  document?: UsersModel['document'];
  documentType?: UsersModel['documentType'];
}
