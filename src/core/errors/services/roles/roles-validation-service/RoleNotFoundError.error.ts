export class RoleNotFoundError extends Error {
  constructor(roles: string[]) {
    super(
      `${roles?.length > 1 ? 'Roles' : 'Role'} ${roles.join(', ')} not found`,
    );
    this.name = 'RoleNotFoundError';
  }
}
