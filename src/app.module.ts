import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import Joi from 'joi';
import { join } from 'path';

/*  Modules */
import { AdminModule } from './modules/admin/admin.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';

/*  Controllers */
import { AppController } from './app.controller';
import { AuthController } from './modules/auth/auth.controller';

/*  Services */
import { ArticlesService } from './modules/articles/articles.service';
import { UsersService } from './modules/users/users.service';
import { CommentsService } from './modules/comments/comments.service';

/* Providers */
import { databaseProviders } from './modules/database/providers/database.providers';
import { AppConfigService } from './config/app-config.service';
import { DbConfigService } from './config/db-config.service';

import appConfiguration from './config/app-configuration';
import dbConfiguration from './config/db-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration, dbConfiguration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('Blog'),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        APP_URL: Joi.string().default('http://localhost'),
        APP_PORT: Joi.number().default(3000),
        JWT_SECRET_KEY: Joi.string().required(),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_DATABASE: Joi.string().default('myblog'),
        DB_USERNAME: Joi.string().default('totem'),
        DB_PASSWORD: Joi.string().default('candidate'),
      }),
    }),
    AdminModule,
    ArticlesModule,
    AuthModule,
    CommentsModule,
    DatabaseModule,
    UsersModule,
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [AdminModule, ArticlesModule, CommentsModule],
      playground: true
    }),
    AdminModule,
  ],
  controllers: [
    AppController,
    AuthController,
  ],
  providers: [
    ...databaseProviders,
    ArticlesService,
    CommentsService,
    UsersService,
    AppConfigService,
    DbConfigService,
  ],
})
export class AppModule { }
