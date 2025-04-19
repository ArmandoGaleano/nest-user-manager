import { Provider } from '@nestjs/common';

import { AbstractCreateUserUseCase } from '@/core/abstractions/application/use-cases/users/create-user.use-case.abstract';
import { AbstractDeleteUserUseCase } from '@/core/abstractions/application/use-cases/users/delete-user.use-case.abstract';
import { AbstractReadUserUseCase } from '@/core/abstractions/application/use-cases/users/read-user.use-case.abstract';
import { AbstractSearchUsersUseCase } from '@/core/abstractions/application/use-cases/users/search-users.use-case.abstract';
import { AbstractUpdateUserUseCase } from '@/core/abstractions/application/use-cases/users/update-user.use-case.abstract';
import { CreateUserUseCase } from '@/application/use-cases/users/create-user.use-case';
import { DeleteUserUseCase } from '@/application/use-cases/users/delete-user.use-case';
import { ReadUserUseCase } from '@/application/use-cases/users/read-user.use-case';
import { SearchUsersUseCase } from '@/application/use-cases/users/search-users.use-case';
import { UpdateUserUseCase } from '@/application/use-cases/users/update-user.use-case';

export const useCaseProviders: Provider[] = [
  {
    provide: AbstractCreateUserUseCase,
    useClass: CreateUserUseCase,
  },
  {
    provide: AbstractReadUserUseCase,
    useClass: ReadUserUseCase,
  },
  {
    provide: AbstractUpdateUserUseCase,
    useClass: UpdateUserUseCase,
  },
  {
    provide: AbstractDeleteUserUseCase,
    useClass: DeleteUserUseCase,
  },
  {
    provide: AbstractSearchUsersUseCase,
    useClass: SearchUsersUseCase,
  },
];
