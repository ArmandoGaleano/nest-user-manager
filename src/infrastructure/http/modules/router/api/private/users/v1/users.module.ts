import { Module } from '@nestjs/common';
import { UsersV1Controller } from 'src/infrastructure/http/controllers/api/private/v1/users.controller';
import { UserHelperModule } from '../../../../../helpers/users.helper.module';
import { AbstractAuthService } from '@/core/abstractions/services/auth/auth.service.abstract';
import { AuthService } from '@/application/services/auth/auth.service';
import { AbstractUsersRepositoryService } from '@/core/abstractions/repositories/users.repository.service.abstract';
import { UsersRepositoryService } from '@/infrastructure/persistence/repositories/users/user.repository.service';
import { AbstractRolesRepositoryService } from '@/core/abstractions/repositories/roles.repository.service.abstract';
import { AbstractUserValidationService } from '@/core/abstractions/services/users/user-validation.service.abstract';
import { AbstractRolesValidationService } from '@/core/abstractions/services/roles/roles-validation.service.abstract';
import { RolesValidationService } from '@/application/services/roles/roles-validation-service/roles-validation.service';
import { UserValidationService } from '@/application/services/users/user-validation-service/user-validation.service';
import { AbstractCreateUserUseCase } from '@/core/abstractions/use-cases/users/create-user.use-case.abstract';
import { CreateUserUseCase } from '@/application/use-cases/users/create-user.use-case';
import { AbstractUpdateUserUseCase } from '@/core/abstractions/use-cases/users/update-user.use-case.abstract';
import { UpdateUserUseCase } from '@/application/use-cases/users/update-user.use-case';
import { AbstractDeleteUserUseCase } from '@/core/abstractions/use-cases/users/delete-user.use-case.abstract';
import { DeleteUserUseCase } from '@/application/use-cases/users/delete-user.use-case';
import { AbstractReadUserUseCase } from '@/core/abstractions/use-cases/users/read-user.use-case.abstract';
import { ReadUserUseCase } from '@/application/use-cases/users/read-user.use-case';
import { AbstractUserRolesRepositoryService } from '@/core/abstractions/repositories/user-roles.repository.service.abstract';
import { UserRolesRepositoryService } from '@/infrastructure/persistence/repositories/user_roles/user-roles.repository.service';
import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';
import { RolesV1Controller } from '@/infrastructure/http/controllers/api/private/v1/roles.controller';
import { AbstractCreateRoleUseCase } from '@/core/abstractions/use-cases/roles/create-role.use-case.abstract';
import { CreateRoleUseCase } from '@/application/use-cases/roles/create-role-use-case';
import { AbstractSearchUsersUseCase } from '@/core/abstractions/use-cases/users/search-users.use-case.abstract';
import { SearchUsersUseCase } from '@/application/use-cases/users/search-users.use-case';

@Module({
  imports: [UserHelperModule],
  controllers: [UsersV1Controller, RolesV1Controller],
  providers: [
    {
      provide: AbstractUsersRepositoryService,
      useClass: UsersRepositoryService,
    },
    {
      provide: AbstractRolesRepositoryService,
      useClass: RolesRepositoryService,
    },
    {
      provide: AbstractUserRolesRepositoryService,
      useClass: UserRolesRepositoryService,
    },
    {
      provide: AbstractUserValidationService,
      useClass: UserValidationService,
    },
    {
      provide: AbstractRolesValidationService,
      useClass: RolesValidationService,
    },
    {
      provide: AbstractAuthService,
      useClass: AuthService,
    },
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
      provide: AbstractCreateRoleUseCase,
      useClass: CreateRoleUseCase,
    },
    {
      provide: AbstractSearchUsersUseCase,
      useClass: SearchUsersUseCase,
    },
  ],
  exports: [],
})
export class UsersV1Module {}
