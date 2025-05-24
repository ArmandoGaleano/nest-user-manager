import { UsersModel } from '@/infrastructure/persistence/database-models/users.model';

export type IUserRepositoryDto = Omit<UsersModel, 'password'>;
