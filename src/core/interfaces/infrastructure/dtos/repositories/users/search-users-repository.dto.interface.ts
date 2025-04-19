import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';

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
    roles: RolesModel['name'][];
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
  | 'roles'
  | 'page'
  | 'limit'
>;
