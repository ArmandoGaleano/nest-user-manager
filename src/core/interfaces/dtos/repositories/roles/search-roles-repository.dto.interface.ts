export type ISearchRolesRepositoryDto = Optional<
  Pick<RolesModel, 'id' | 'name' | 'createdAt' | 'updatedAt'>,
  'id' | 'name' | 'createdAt' | 'updatedAt'
> & {
  page?: number;
  limit?: number;
};
