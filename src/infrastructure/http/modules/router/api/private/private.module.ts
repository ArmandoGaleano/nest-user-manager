import { Module } from '@nestjs/common';
import { PrivateUserModule } from './users/private-user.module';

@Module({
  imports: [PrivateUserModule],
})
export class PrivateModule {}
