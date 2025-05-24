import { Permission } from '@/domain/role/entities/permission.entity';

export const USER_PERMISSIONS: Record<
  'CREATE_USER' | 'READ_USER' | 'UPDATE_USER' | 'DELETE_USER' | 'SEARCH_USERS',
  Permission
> = {
  CREATE_USER: new Permission({
    name: 'CREATE_USER',
    description: 'Can create data',
  }),
  READ_USER: new Permission({
    name: 'READ_USER',
    description: 'Can read data',
  }),

  UPDATE_USER: new Permission({
    name: 'UPDATE_USER',
    description: 'Can update data',
  }),
  DELETE_USER: new Permission({
    name: 'DELETE_USER',
    description: 'Can delete data',
  }),
  SEARCH_USERS: new Permission({
    name: 'SEARCH_USERS',
    description: 'Can search data',
  }),
};
