import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  /* Global middlewares */
  app.enableCors()
  app.use(morgan('tiny'));

  const port = configService.get<number>('PORT');
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
