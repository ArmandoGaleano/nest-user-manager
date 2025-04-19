import { RolesModel } from '@/infrastructure/persistence/database-models/roles.model';

export type ISearchRolesRepositoryDto = Optional<
  Pick<RolesModel, 'id' | 'name' | 'createdAt' | 'updatedAt'>,
  'id' | 'name' | 'createdAt' | 'updatedAt'
> & {
  page?: number;
  limit?: number;
  createdAtStart?: RolesModel['createdAt'];
  createdAtEnd?: RolesModel['createdAt'];
  updatedAtStart?: RolesModel['updatedAt'];
  updatedAtEnd?: RolesModel['updatedAt'];
  enableExactSearch?: boolean;
};
