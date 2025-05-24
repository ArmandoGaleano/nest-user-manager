import { UserRepositoryDto } from '@/infrastructure/dtos/persistence/repositories/users/user-repository.dto';

export type ISearchUsersRepositoryResultDto = {
  data: UserRepositoryDto[];
  page: number;
  limit: number;
  total: number;
};
