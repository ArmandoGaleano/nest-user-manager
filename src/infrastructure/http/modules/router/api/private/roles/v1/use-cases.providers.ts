import { Provider } from '@nestjs/common';

import { CreateRoleUseCase } from '@/application/use-cases/roles/create-role.use-case';
import { DeleteRoleUseCase } from '@/application/use-cases/roles/delete-role.use-case';
import { ReadRoleUseCase } from '@/application/use-cases/roles/read-role.use-case';
import { UpdateRoleUseCase } from '@/application/use-cases/roles/update-role.use-case';

import { AbstractCreateRoleUseCase } from '@/core/abstractions/application/use-cases/roles/create-role.use-case.abstract';
import { AbstractDeleteRoleUseCase } from '@/core/abstractions/application/use-cases/roles/delete-role.use-case.abstract';
import { AbstractReadRoleUseCase } from '@/core/abstractions/application/use-cases/roles/read-role.use-case.abstract';
import { AbstractUpdateRoleUseCase } from '@/core/abstractions/application/use-cases/roles/update-role.use-case.abstract';
import { AbstractSearchRoleUseCase } from '@/core/abstractions/application/use-cases/roles/search-role.use-case.abstract';
import { SearchRoleUseCase } from '@/application/use-cases/roles/search-role.use-case';

export const useCaseProviders: Provider[] = [
  {
    provide: AbstractCreateRoleUseCase,
    useClass: CreateRoleUseCase,
  },
  {
    provide: AbstractReadRoleUseCase,
    useClass: ReadRoleUseCase,
  },
  {
    provide: AbstractUpdateRoleUseCase,
    useClass: UpdateRoleUseCase,
  },
  {
    provide: AbstractDeleteRoleUseCase,
    useClass: DeleteRoleUseCase,
  },
  {
    provide: AbstractSearchRoleUseCase,
    useClass: SearchRoleUseCase,
  },
];
