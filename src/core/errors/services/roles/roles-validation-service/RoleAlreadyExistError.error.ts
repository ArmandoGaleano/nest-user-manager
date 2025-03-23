export class RoleAlreadyExistError extends Error {
  constructor() {
    super(`Role already exists`);
    this.name = 'RoleAlreadyExistError';
  }
}
