import { Provider } from '@nestjs/common';

import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';
import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';

import { RolesValidationService } from '@/application/services/roles/roles-validation-service/roles-validation.service';
import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';

export const serviceProviders: Provider[] = [
  {
    provide: AbstractRolesRepositoryService,
    useClass: RolesRepositoryService,
  },
  {
    provide: AbstractRolesValidationService,
    useClass: RolesValidationService,
  },
];
