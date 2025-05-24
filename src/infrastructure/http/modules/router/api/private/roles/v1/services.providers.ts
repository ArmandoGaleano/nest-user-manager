import { Provider } from '@nestjs/common';

import { RolesValidationService } from '@/application/services/roles/roles-validation-service/roles-validation.service';
import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';

export const serviceProviders: Provider[] = [
  {
    provide: RolesRepositoryService,
    useClass: RolesRepositoryService,
  },

  {
    provide: RolesValidationService,
    useClass: RolesValidationService,
  },
];
