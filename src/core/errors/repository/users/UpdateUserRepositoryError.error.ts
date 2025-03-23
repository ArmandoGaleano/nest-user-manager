export class UpdateUserRepositoryError extends Error {
  constructor() {
    super(`Error updating user`);
    this.name = 'UpdateUserRepositoryError';
  }
}
