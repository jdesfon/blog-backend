import { Module } from '@nestjs/common';

/*  Modules */
import { ArticlesModule } from './modules/articles/articles.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';

/*  Controllers */
import { AppController } from './app.controller';
import { ArticlesController } from './modules/articles/articles.controller';
import { AuthController } from './modules/auth/auth.controller';
import { CommentsController } from './modules/comments/comments.controller';

/*  Services */
import { ArticlesService } from './modules/articles/articles.service';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { CommentsService } from './modules/comments/comments.service';

/* Providers */
import { databaseProviders } from './modules/database/providers/database.providers';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    ArticlesModule,
    AuthModule,
    CommentsModule,
    DatabaseModule,
    UsersModule
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
  ],
})
export class AppModule { }
