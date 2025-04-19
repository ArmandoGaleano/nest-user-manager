export class RoleNotFoundError extends Error {
  constructor(
    roles: Array<{
      id?: string;
      name?: string;
    }>,
  ) {
    super(
      `Role(s) not found: ${roles
        .map((role) => (role.id ? `id: ${role.id}` : `name: ${role.name}`))
        .join(', ')}`,
    );
    this.name = 'RoleNotFoundError';
  }
}
