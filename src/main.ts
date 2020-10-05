import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Global middlewares */
  app.use(cors());
  app.use(helmet());
  app.use(morgan('tiny'));
  await app.listen(3000);
}
bootstrap();
