import { Provider } from '@nestjs/common';

import { SearchUserRoleUseCase } from '@/application/use-cases/user-roles/search-user-role.use-case';

export const useCaseProviders: Provider[] = [
  {
    provide: SearchUserRoleUseCase,
    useClass: SearchUserRoleUseCase,
  },
];
