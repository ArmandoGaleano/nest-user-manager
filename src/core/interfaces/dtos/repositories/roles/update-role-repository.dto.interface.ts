export type IUpdateRoleRepositoryDto = Pick<RolesModel, 'id' | 'updatedAt'> &
  Optional<Pick<RolesModel, 'name' | 'description'>, 'name' | 'description'>;
