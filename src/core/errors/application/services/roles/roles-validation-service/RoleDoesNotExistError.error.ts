export class RoleDoesNotExistError extends Error {
  constructor() {
    super(`Role does not exist`);
    this.name = 'RoleDoesNotExistError';
  }
}
