export class UserRoleDoesNotExistError extends Error {
  constructor() {
    super(`User role does not exist`);
    this.name = 'UserRoleDoesNotExistError';
  }
}
