import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';

export interface IDeleteRoleRepositoryDto {
  id: RolesModel['id'];
}
