import { NestFactory } from '@nestjs/core';
import { Response } from '@nestjs/common';
import { AppModule } from './app.module';

import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Global middlewares */
  app.use(cors());
  app.use(helmet());
  app.use(morgan('tiny'));
  await app.listen(3000);
}
bootstrap();
