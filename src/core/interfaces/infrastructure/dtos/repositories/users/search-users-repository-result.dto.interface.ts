import { AbstractUserRepositoryDto } from '@/core/abstractions/infrastructure/dtos/repositories/users/user-repository.dto.abstract';

export type ISearchUsersRepositoryResultDto = {
  data: AbstractUserRepositoryDto[];
  page: number;
  limit: number;
  total: number;
};
