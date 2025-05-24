import { ROLE_DEFINITIONS } from '@/domain/role/config/roles-definitions.conf';
import { SystemDateTimeHelperService } from '@/shared/helpers/system-date-time/system-date-time.helper.service';
import { Knex } from 'knex';

const systemDateTimeHelperService = new SystemDateTimeHelperService();

export async function seed(knex: Knex): Promise<void> {
  const now = systemDateTimeHelperService.getTimestamp();

  for (const role of ROLE_DEFINITIONS) {
    const { id, name, description, permissions } = role;

    const conflictingRole = await knex('roles')
      .where({ name })
      .andWhereNot({ id })
      .first();

    if (conflictingRole) {
      throw new Error(
        `Role name conflict: "${name}" is already used by another role.`,
      );
    }

    const existingRole = await knex('roles').where({ id }).first();

    const shouldInsertRole = !existingRole;
    const shouldUpdateRole =
      existingRole && existingRole.description !== description;

    if (shouldInsertRole) {
      await knex('roles').insert({
        id,
        name,
        description,
        createdAt: now,
        updatedAt: now,
      });
    }

    if (shouldUpdateRole) {
      await knex('roles').where({ id }).update({
        description,
        updatedAt: now,
      });
    }

    for (const permission of permissions) {
      const conflictingPermission = await knex('permissions')
        .where({ name: permission.name })
        .andWhereNot({ id: permission.id })
        .first();

      if (conflictingPermission) {
        throw new Error(
          `Permission name conflict: "${permission.name}" is already used by another permission.`,
        );
      }

      const existingPermission = await knex('permissions')
        .where({ id: permission.id })
        .first();

      const shouldInsertPermission = !existingPermission;
      const shouldUpdatePermission =
        existingPermission &&
        (existingPermission.name !== permission.name ||
          existingPermission.description !== permission.description);

      if (shouldInsertPermission) {
        await knex('permissions').insert({
          id: permission.id,
          name: permission.name,
          description: permission.description,
          createdAt: now,
          updatedAt: now,
        });
      }

      if (shouldUpdatePermission) {
        await knex('permissions').where({ id: permission.id }).update({
          name: permission.name,
          description: permission.description,
          updatedAt: now,
        });
      }

      await knex('role_permissions')
        .insert({
          roleId: role.id,
          permissionId: permission.id,
          createdAt: now,
          updatedAt: now,
        })
        .onConflict(['roleId', 'permissionId'])
        .ignore();
    }
  }

  const roleIds = ROLE_DEFINITIONS.map((r) => r.id);
  await knex('roles').whereRaw('id NOT IN (?)', [roleIds]).del();
}
