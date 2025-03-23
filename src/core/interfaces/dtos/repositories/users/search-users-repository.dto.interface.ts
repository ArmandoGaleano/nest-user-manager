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
  },
  | 'id'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'birthdate'
  | 'document'
  | 'documentType'
  | 'createdAt'
  | 'updatedAt'
  | 'roles'
  | 'page'
  | 'limit'
>;
