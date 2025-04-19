export class RoleDoesNotExist extends Error {
  constructor() {
    super(`Role does not exist`);
    this.name = 'RoleDoesNotExist';
  }
}
