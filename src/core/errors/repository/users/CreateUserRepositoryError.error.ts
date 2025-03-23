export class CreateUserRepositoryError extends Error {
  constructor() {
    super(`Error creating user`);
    this.name = 'CreateUserRepositoryError';
  }
}
