// import { ROLE_DEFINITIONS } from '../config/roles-definitions.conf';
// import { RoleEntity } from '../entities/role.entity';
// import { Uuid } from '../../../shared/value-objects/Uuid';

// export class RoleRegistryService {
//   public readonly roles: RoleEntity[] = ROLE_DEFINITIONS;

//   constructor() {}

//   public getRoleByName(roleName: string): RoleEntity | undefined {
//     return this.roles.find((role) => role.name === roleName);
//   }

//   public getRoleById(roleId: string): RoleEntity | undefined {
//     return this.roles.find((role) => role.id.value === roleId);
//   }

//   public hasPermission(roleIds: Uuid[], permissionIds: Uuid[]): boolean {
//     const roles = roleIds.map((roleId) => this.getRoleById(roleId.value));

//     const hasAllPermissions = roles.reduce((acc, role) => {
//       role?.permissions.map((permission) => {
//         if (
//           permissionIds.some(
//             (permissionId) => permissionId.value === permission.id.value,
//           )
//         ) {
//           acc[permission.id.value] = true;
//         }
//       });

//       return acc;
//     }, {});

//     return permissionIds.every(
//       (permissionId) => hasAllPermissions[permissionId.value],
//     );
//   }
// }
