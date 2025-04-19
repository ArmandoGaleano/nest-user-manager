import { RolesValidationService } from '@/application/services/roles/roles-validation-service/roles-validation.service';
import { AbstractRolesValidationService } from '@/core/abstractions/application/services/roles/roles-validation.service.abstract';
import { AbstractRolesRepositoryService } from '@/core/abstractions/infrastructure/repositories/roles.repository.service.abstract';

import { RolesRepositoryService } from '@/infrastructure/persistence/repositories/roles/roles.repository.service';

import { Provider } from '@nestjs/common';

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
