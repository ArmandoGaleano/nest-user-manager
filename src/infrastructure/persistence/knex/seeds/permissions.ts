import { ROLE_DEFINITIONS } from '@/domain/role/config/roles-definitions.conf';
import { SystemDateTimeHelperService } from '@/shared/helpers/system-date-time/system-date-time.helper.service';
import { Knex } from 'knex';

const systemDateTimeHelperService = new SystemDateTimeHelperService();

export async function seed(knex: Knex): Promise<void> {
  const currentDate = systemDateTimeHelperService.getDate();

  for (const role of ROLE_DEFINITIONS) {
    const {
      id: roleId,
      name: roleName,
      description: roleDesc,
      permissions,
    } = role;

    // 1° Get Existing Role
    const existingRole = await knex('roles')
      .where({ id: roleId.value })
      .first();
    const isUpdatingRole =
      existingRole &&
      (existingRole.name !== roleName || existingRole.description !== roleDesc);

    // 2° Upsert of roles
    await knex('roles')
      .insert({
        id: roleId.value,
        name: roleName,
        description: roleDesc,
        ...(!existingRole ? { createdAt: currentDate } : {}),
        ...(isUpdatingRole ? { updatedAt: currentDate } : {}),
      })
      .onConflict('id')
      .merge();

    // 3. Upsert de permissions e associação
    for (const perm of permissions) {
      const { id: permId, name: permName, description: permDesc } = perm;

      // 3.2 Insert ou update de permission
      const existingPerm = await knex('permissions')
        .where({ id: permId.value })
        .first();
      const isUpdatingPerm =
        existingPerm &&
        (existingPerm.name !== permName ||
          existingPerm.description !== permDesc);

      await knex('permissions')
        .insert({
          id: permId.value,
          name: permName,
          description: permDesc,
          ...(!existingPerm ? { createdAt: currentDate } : {}),
          ...(isUpdatingPerm ? { updatedAt: currentDate } : {}),
        })
        .onConflict('id')
        .merge();

      const existingRolePerm = await knex('role_permissions')
        .where({ roleId: roleId.value, permissionId: permId.value })
        .first();
      const isUpdatingRolePerm =
        existingRolePerm &&
        (existingRolePerm.roleId !== roleId.value ||
          existingRolePerm.permissionId !== permId.value);
      // 3.3 Associação role_permissions
      await knex('role_permissions')
        .insert({
          roleId: roleId.value,
          permissionId: permId.value,
          ...(!existingRolePerm ? { createdAt: currentDate } : {}),
          ...(isUpdatingRolePerm ? { updatedAt: currentDate } : {}),
        })
        .onConflict(['roleId', 'permissionId'])
        .merge();
    }
  }

  const roleIds = ROLE_DEFINITIONS.map((r) => r.id.value);
  // Delete all roles and permissions that are not in ROLE_DEFINITIONS
  const existingRoles = await knex('roles')
    .whereNotIn('id', roleIds)
    .select('id');

  const existingRolePermissons = await Promise.all(
    existingRoles
      .map((role) => {
        const permissionIds = ROLE_DEFINITIONS.find(
          (r) => r.id === role.id,
        )?.permissions.map((p) => p.id.value);

        if (!permissionIds) {
          return null;
        }

        return knex('permissions').whereNotIn('id', permissionIds).select('id');
      })
      ?.filter(Boolean) ?? [],
  );

  const allExistingRoleIds = existingRoles.map((role) => role.id);
  const allExistingRolePermissionsIds = existingRolePermissons
    .flat()
    .map((perm) => perm.id);

  // Delete all roles that are not in ROLE_DEFINITIONS
  await knex('roles')
    .whereIn('id', allExistingRoleIds)
    .whereNotIn('id', roleIds)
    .del();

  // Delete all permissions that are not in ROLE_DEFINITIONS
  await knex('permissions')
    .whereIn('id', allExistingRolePermissionsIds)
    .whereNotIn('id', allExistingRolePermissionsIds)
    .del();
}
