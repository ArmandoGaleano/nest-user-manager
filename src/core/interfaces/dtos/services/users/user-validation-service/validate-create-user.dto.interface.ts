export type IValidateCreateUserDto = UsersModel & {
  roles: Array<RolesModel['name']>;
};
