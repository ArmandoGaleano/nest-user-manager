import { Provider } from '@nestjs/common';

import { AbstractUserRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/user-roles.repository.service.abstract';
import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';
import { AbstractUsersRepositoryService } from '@/core/abstractions/infrastructure/repositories/users.repository.service.abstract';
import { AbstractUserRolesValidationService } from '@/core/abstractions/application/services/user-roles/user-roles-validation.service.abstract';
import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';
import { AbstractUserValidationService } from '@/core/abstractions/application/services/users/user-validation.service.abstract';

import { UserRolesRepositoryService } from '@/infrastructure/persistence/repositories/user_roles/user-roles.repository.service';
import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';
import { UsersRepositoryService } from '@/infrastructure/persistence/repositories/users/user.repository.service';
import { UserRolesValidationService } from '@/application/services/user-roles/user-roles-validation-service/user-roles-validation.service';
import { RolesValidationService } from '@/application/services/roles/roles-validation-service/roles-validation.service';
import { UserValidationService } from '@/application/services/users/user-validation-service/user-validation.service';

export const serviceProviders: Provider[] = [
  {
    provide: AbstractUserRolesRepositoryService,
    useClass: UserRolesRepositoryService,
  },
  {
    provide: AbstractRolesRepositoryService,
    useClass: RolesRepositoryService,
  },
  {
    provide: AbstractUsersRepositoryService,
    useClass: UsersRepositoryService,
  },
  {
    provide: AbstractUserRolesValidationService,
    useClass: UserRolesValidationService,
  },
  {
    provide: AbstractRolesValidationService,
    useClass: RolesValidationService,
  },
  {
    provide: AbstractUserValidationService,
    useClass: UserValidationService,
  },
];
