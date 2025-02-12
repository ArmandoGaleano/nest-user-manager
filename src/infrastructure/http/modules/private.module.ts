import { Module } from '@nestjs/common';
import { PrivateUserModule } from './private/users/private-user.module';

@Module({
  imports: [PrivateUserModule],
})
export class PrivateModule {}
