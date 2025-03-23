import { Module } from '@nestjs/common';
import { PrivateModule } from './api/private/private.module';

@Module({
  imports: [PrivateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
