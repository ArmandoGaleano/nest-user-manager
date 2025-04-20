import { Module } from '@nestjs/common';

import { MainHelperServicesModule } from '../../../../../helpers/main.helper.module';
import { UsersV1Controller } from 'src/infrastructure/http/controllers/api/private/v1/users.controller';
import { serviceProviders } from './services.providers';
import { useCaseProviders } from './use-cases.providers';

@Module({
  imports: [MainHelperServicesModule],
  controllers: [UsersV1Controller],
  providers: [...serviceProviders, ...useCaseProviders],
  exports: [],
})
export class UsersV1Module {}
