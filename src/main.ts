import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/http/modules/app.module';
import dotenv from 'dotenv';

dotenv.config({
  path: '../.env',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
