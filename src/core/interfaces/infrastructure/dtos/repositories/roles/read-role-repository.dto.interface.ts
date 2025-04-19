import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';

export interface IReadRoleRepositoryDto {
  id?: RolesModel['id'];
  name?: RolesModel['name'];
}
