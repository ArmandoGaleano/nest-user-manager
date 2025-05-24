import { Module } from '@nestjs/common';

import { MainHelperServicesModule } from '../../../../../helpers/main.helper.module';
import { serviceProviders } from './services.providers';
import { useCaseProviders } from './use-cases.providers';
import { RolesV1Controller } from '@/infrastructure/http/controllers/api/private/v1/roles.controller';

@Module({
  imports: [MainHelperServicesModule],
  controllers: [RolesV1Controller],
  providers: [...serviceProviders, ...useCaseProviders],
  exports: [],
})
export class RolesV1Module {}
