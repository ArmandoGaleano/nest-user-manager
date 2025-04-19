import { RolesV1Controller } from '@/infrastructure/http/controllers/api/private/v1/roles.controller';
import { MainHelperServicesModule } from '@/infrastructure/http/modules/helpers/main.helper.module';
import { Module } from '@nestjs/common';
import { useCaseProviders } from './use-cases.providers';
import { serviceProviders } from './services.providers';

@Module({
  imports: [MainHelperServicesModule],
  controllers: [RolesV1Controller],
  providers: [...serviceProviders, ...useCaseProviders],
  exports: [],
})
export class RolesV1Module {}
