import { MainHelperServicesModule } from '@/infrastructure/http/modules/helpers/main.helper.module';
import { Module } from '@nestjs/common';
import { useCaseProviders } from './use-cases.providers';
import { serviceProviders } from './services.providers';
import { UserRolesV1Controller } from '@/infrastructure/http/controllers/api/private/v1/user-roles.controller';

@Module({
  imports: [MainHelperServicesModule],
  controllers: [UserRolesV1Controller],
  providers: [...serviceProviders, ...useCaseProviders],
  exports: [],
})
export class UserRolesV1Module {}
