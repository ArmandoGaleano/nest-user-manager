import { Provider } from '@nestjs/common';

import { UserRolesValidationService } from '@/application/services/user-roles/user-roles-validation-service/user-roles-validation.service';
import { UserRolesRepositoryService } from '@/infrastructure/persistence/repositories/user_roles/user-roles.repository.service';

export const serviceProviders: Provider[] = [
  {
    provide: UserRolesValidationService,
    useClass: UserRolesValidationService,
  },

  {
    provide: UserRolesRepositoryService,
    useClass: UserRolesRepositoryService,
  },
];
