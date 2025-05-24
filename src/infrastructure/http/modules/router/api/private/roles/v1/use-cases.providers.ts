import { Provider } from '@nestjs/common';

import { ReadRoleUseCase } from '@/application/use-cases/roles/read-role.use-case';
import { SearchRoleUseCase } from '@/application/use-cases/roles/search-role.use-case';

export const useCaseProviders: Provider[] = [
  {
    provide: ReadRoleUseCase,
    useClass: ReadRoleUseCase,
  },
  {
    provide: SearchRoleUseCase,
    useClass: SearchRoleUseCase,
  },
];
