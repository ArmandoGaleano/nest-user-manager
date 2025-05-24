import { ROLE_DEFINITIONS } from '@/domain/role/config/roles-definitions.conf';
import { SystemDateTimeHelperService } from '@/shared/helpers/system-date-time/system-date-time.helper.service';
import { Knex } from 'knex';

const systemDateTimeHelperService = new SystemDateTimeHelperService();

export async function seed(knex: Knex): Promise<void> {
  const now = systemDateTimeHelperService.getTimestamp();
  const roleIds = ROLE_DEFINITIONS.map((r) => r.id);

  for (const role of ROLE_DEFINITIONS) {
    const {
      id: roleId,
      name: roleName,
      description: roleDesc,
      permissions,
    } = role;

    // 1. Conflito de name em roles
    const conflictingRole = await knex('roles')
      .where('name', roleName)
      .andWhereNot({ id: roleId })
      .first();
    if (conflictingRole) {
      throw new Error(
        `Role name conflict: "${roleName}" já existe em outro registro.`,
      );
    }

    // 2. Upsert de role
    const existingRole = await knex('roles').where({ id: roleId }).first();
    if (!existingRole) {
      await knex('roles').insert({
        id: roleId,
        name: roleName,
        description: roleDesc,
        createdAt: now,
        updatedAt: now,
      });
    }
    if (existingRole && existingRole.description !== roleDesc) {
      await knex('roles')
        .where({ id: roleId })
        .update({ description: roleDesc, updatedAt: now });
    }

    // 3. Upsert de permissions e associação
    for (const perm of permissions) {
      const { id: permId, name: permName, description: permDesc } = perm;

      // 3.1 Conflito de name em permissions
      const conflictingPerm = await knex('permissions')
        .where('name', permName)
        .andWhereNot({ id: permId })
        .first();
      if (conflictingPerm) {
        throw new Error(
          `Permission name conflict: "${permName}" já existe em outro registro.`,
        );
      }

      // 3.2 Insert ou update de permission
      const existingPerm = await knex('permissions')
        .where({ id: permId })
        .first();
      if (!existingPerm) {
        await knex('permissions').insert({
          id: permId,
          name: permName,
          description: permDesc,
          createdAt: now,
          updatedAt: now,
        });
      }
      if (
        existingPerm &&
        (existingPerm.name !== permName ||
          existingPerm.description !== permDesc)
      ) {
        await knex('permissions').where({ id: permId }).update({
          name: permName,
          description: permDesc,
          updatedAt: now,
        });
      }

      // 3.3 Associação role_permissions
      await knex('role_permissions')
        .insert({
          roleId: roleId,
          permissionId: permId,
          createdAt: now,
          updatedAt: now,
        })
        .onConflict(['roleId', 'permissionId'])
        .ignore();
    }
  }

  // 4. Delete roles não definidas
  if (roleIds.length > 0) {
    await knex('roles').where('id', 'not in', roleIds).del();
  }

  // 5. Delete permissions não associadas às roles definidas
  const permissionIds = ROLE_DEFINITIONS.flatMap((r) =>
    r.permissions.map((p) => p.id),
  );
  if (permissionIds.length > 0) {
    await knex('permissions').where('id', 'not in', permissionIds).del();
  }
}
