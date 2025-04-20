import { Module } from '@nestjs/common';

import { MainHelperServicesModule } from '@/infrastructure/http/modules/helpers/main.helper.module';
import { RolesV1Controller } from '@/infrastructure/http/controllers/api/private/v1/roles.controller';
import { serviceProviders } from './services.providers';
import { useCaseProviders } from './use-cases.providers';

@Module({
  imports: [MainHelperServicesModule],
  controllers: [RolesV1Controller],
  providers: [...serviceProviders, ...useCaseProviders],
  exports: [],
})
export class RolesV1Module {}
