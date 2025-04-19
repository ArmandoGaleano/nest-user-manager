import { Provider } from '@nestjs/common';

import { AuthService } from '@/application/services/auth/auth.service';
import { RolesValidationService } from '@/application/services/roles/roles-validation-service/roles-validation.service';
import { UserValidationService } from '@/application/services/users/user-validation-service/user-validation.service';
import { AbstractAuthService } from '@/core/abstractions/application/services/auth/auth.service.abstract';
import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';
import { AbstractUserValidationService } from '@/core/abstractions/application/services/users/user-validation.service.abstract';
import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';
import { AbstractUserRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/user-roles.repository.service.abstract';
import { AbstractUsersRepositoryService } from '@/core/abstractions/infrastructure/repositories/users.repository.service.abstract';

import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';
import { UserRolesRepositoryService } from '@/infrastructure/persistence/repositories/user_roles/user-roles.repository.service';
import { UsersRepositoryService } from '@/infrastructure/persistence/repositories/users/user.repository.service';

export const serviceProviders: Provider[] = [
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
];
