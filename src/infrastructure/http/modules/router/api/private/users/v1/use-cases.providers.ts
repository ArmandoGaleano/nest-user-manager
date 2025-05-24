import { Provider } from '@nestjs/common';

import { CreateUserUseCase } from '@/application/use-cases/users/create-user.use-case';
import { ReadUserUseCase } from '@/application/use-cases/users/read-user.use-case';
import { UpdateUserUseCase } from '@/application/use-cases/users/update-user.use-case';
import { DeleteUserUseCase } from '@/application/use-cases/users/delete-user.use-case';
import { SearchUsersUseCase } from '@/application/use-cases/users/search-users.use-case';

export const useCaseProviders: Provider[] = [
  {
    provide: CreateUserUseCase,
    useClass: CreateUserUseCase,
  },
  {
    provide: ReadUserUseCase,
    useClass: ReadUserUseCase,
  },
  {
    provide: UpdateUserUseCase,
    useClass: UpdateUserUseCase,
  },
  {
    provide: DeleteUserUseCase,
    useClass: DeleteUserUseCase,
  },
  {
    provide: SearchUsersUseCase,
    useClass: SearchUsersUseCase,
  },
];
