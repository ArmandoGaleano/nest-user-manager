import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';
import { UsersModel } from '@/infrastructure/persistence/database-models/users.model';

export type ISearchUsersRepositoryDto = Optional<
  Pick<
    UsersModel,
    | 'id'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'birthdate'
    | 'document'
    | 'documentType'
    | 'createdAt'
    | 'updatedAt'
  > & {
    roleNames: RolesModel['name'][];
    page: number;
    limit: number;
    createdAtStart: UsersModel['createdAt'];
    createdAtEnd: UsersModel['createdAt'];
    updatedAtStart: UsersModel['updatedAt'];
    updatedAtEnd: UsersModel['updatedAt'];
  },
  | 'id'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'birthdate'
  | 'document'
  | 'documentType'
  | 'createdAt'
  | 'createdAtStart'
  | 'createdAtEnd'
  | 'updatedAt'
  | 'updatedAtStart'
  | 'updatedAtEnd'
  | 'roleNames'
  | 'page'
  | 'limit'
>;
