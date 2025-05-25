import { Permission } from '@/domain/role/entities/permission.entity';
import { Uuid } from '@/shared/value-objects/Uuid';

export const USER_PERMISSIONS: Record<
  'CREATE_USER' | 'READ_USER' | 'UPDATE_USER' | 'DELETE_USER' | 'SEARCH_USERS',
  Permission
> = {
  CREATE_USER: new Permission({
    id: new Uuid('fb47ce7f-e426-49af-bacc-d57520cf044d'),
    name: 'CREATE_USER',
    description: 'Can create data',
  }),
  READ_USER: new Permission({
    id: new Uuid('a6db1d66-4077-43ab-9cf7-611318c685ed'),
    name: 'READ_USER',
    description: 'Can read data',
  }),

  UPDATE_USER: new Permission({
    id: new Uuid('35079e0f-d14d-436c-961b-ae5f9c2f2434'),
    name: 'UPDATE_USER',
    description: 'Can update data',
  }),
  DELETE_USER: new Permission({
    id: new Uuid('d30a69f4-728d-4fde-a54b-a28af63e191e'),
    name: 'DELETE_USER',
    description: 'Can delete data',
  }),
  SEARCH_USERS: new Permission({
    id: new Uuid('890d37f2-6156-4c2d-b18a-4e1b59843917'),
    name: 'SEARCH_USERS',
    description: 'Can search data',
  }),
};
