import { Provider } from '@nestjs/common';

import { UsersRepositoryService } from '@/infrastructure/persistence/repositories/users/user.repository.service';
import { UserValidationService } from '@/application/services/users/user-validation-service/user-validation.service';
import { AuthService } from '@/application/services/auth/auth.service';
import { RolesValidationService } from '@/application/services/roles/roles-validation-service/roles-validation.service';
import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';
import { UserRolesRepositoryService } from '@/infrastructure/persistence/repositories/user_roles/user-roles.repository.service';

export const serviceProviders: Provider[] = [
  {
    provide: UsersRepositoryService,
    useClass: UsersRepositoryService,
  },
  {
    provide: RolesRepositoryService,
    useClass: RolesRepositoryService,
  },
  {
    provide: UserRolesRepositoryService,
    useClass: UserRolesRepositoryService,
  },
  {
    provide: UserValidationService,
    useClass: UserValidationService,
  },
  {
    provide: RolesValidationService,
    useClass: RolesValidationService,
  },
  {
    provide: AuthService,
    useClass: AuthService,
  },
];
