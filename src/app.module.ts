import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

/*  Modules */
import { ArticlesModule } from './modules/articles/articles.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';

/*  Controllers */
import { AppController } from './app.controller';
import { ArticlesController } from './modules/articles/articles.controller';
import { AuthController } from './modules/auth/auth.controller';
import { CommentsController } from './modules/comments/comments.controller';

/*  Services */
import { ArticlesService } from './modules/articles/articles.service';
import { UsersService } from './modules/users/users.service';
import { CommentsService } from './modules/comments/comments.service';

/* Providers */
import { databaseProviders } from './modules/database/providers/database.providers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ArticlesModule,
    AuthModule,
    CommentsModule,
    DatabaseModule,
    UsersModule,
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [ArticlesModule, CommentsModule],
      playground: true
    }),
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
