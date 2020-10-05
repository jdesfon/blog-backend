import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigModule } from '@nestjs/config';

import { ArticlesModule } from './../src/modules/articles/articles.module';
import { AuthModule } from './../src/modules/auth/auth.module';
import { CommentsModule } from './../src/modules/comments/comments.module';
import { DatabaseModule } from './../src/modules/database/database.module';
import { UsersModule } from './../src/modules/users/users.module';

import { AppController } from './../src/app.controller';
import { ArticlesController } from './../src/modules/articles/articles.controller';
import { AuthController } from './../src/modules/auth/auth.controller';
import { CommentsController } from './../src/modules/comments/comments.controller';

import { ArticlesService } from './../src/modules/articles/articles.service';
import { CommentsService } from './../src/modules/comments/comments.service';
import { UsersService } from './../src/modules/users/users.service';

import { databaseProviders } from './../src/modules/database/providers/database.providers';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.test.env' }),
        AppModule,
        ArticlesModule,
        AuthModule,
        CommentsModule,
        DatabaseModule,
        UsersModule,
      ],
      controllers: [
        AppController,
        AuthController,
        ArticlesController,
        CommentsController
      ],
      providers: [
        ...databaseProviders,
        ArticlesService,
        CommentsService,
        UsersService,
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/status (GET)', () => {
    return request(app.getHttpServer())
      .get('/status')
      .expect(200)
      .expect('OK');
  });
});
