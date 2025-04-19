export class UserRoleAlreadyExistError extends Error {
  constructor() {
    super(`User role already exists`);
    this.name = 'UserRoleAlreadyExistError';
  }
}
