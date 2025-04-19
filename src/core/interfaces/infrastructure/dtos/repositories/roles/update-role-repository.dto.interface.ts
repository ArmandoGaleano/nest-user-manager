import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';

export type IUpdateRoleRepositoryDto = Pick<RolesModel, 'id' | 'updatedAt'> &
  Optional<Pick<RolesModel, 'name' | 'description'>, 'name' | 'description'>;
