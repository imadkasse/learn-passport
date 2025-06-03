import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  // إعداد مجلد views
  app.setBaseViewsDir(join(__dirname, '../src/', 'views'));

  // تحديد محرك العرض
  app.setViewEngine('pug');

  await app.listen(4000);
}
bootstrap();
