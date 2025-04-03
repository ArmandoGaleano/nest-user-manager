export type ISearchUsersRepositoryResultDto = Optional<
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
  | 'page'
  | 'limit'
>;
