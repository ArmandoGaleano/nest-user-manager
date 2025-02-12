import { Module } from '@nestjs/common';
import { PrivateModule } from './private.module';

@Module({
  imports: [PrivateModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
