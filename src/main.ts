import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { NestFactory } from '@nestjs/core';
import morgan from 'morgan';

import { AppModule } from './app.module';

import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* Global middlewares */
  app.enableCors()
  app.use(morgan('tiny'));

  const appConfig: AppConfigService = app.get('AppConfigService');
  await app.listen(appConfig.port);
  console.log(`Application is running on: ${appConfig.url}:${appConfig.port}`);
}
bootstrap();
