import { Provider } from '@nestjs/common';

import { AbstractCreateUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/create-user-role.use-case.abstract';
import { AbstractDeleteUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/delete-user-role.use-case.abstract';
import { AbstractSearchUserRoleUseCase } from '@/core/abstractions/application/use-cases/user-roles/search-user-role.use-case.abstract';

import { CreateUserRoleUseCase } from '@/application/use-cases/user-roles/create-user-role.use-case';
import { DeleteUserRoleUseCase } from '@/application/use-cases/user-roles/delete-user-role.use-case';
import { SearchUserRoleUseCase } from '@/application/use-cases/user-roles/search-user-role.use-case';

export const useCaseProviders: Provider[] = [
  {
    provide: AbstractCreateUserRoleUseCase,
    useClass: CreateUserRoleUseCase,
  },
  {
    provide: AbstractDeleteUserRoleUseCase,
    useClass: DeleteUserRoleUseCase,
  },
  {
    provide: AbstractSearchUserRoleUseCase,
    useClass: SearchUserRoleUseCase,
  },
];
