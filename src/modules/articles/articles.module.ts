import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ArticleResolver } from './article.resolver';
import { ArticlesService } from './articles.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [ArticlesService, ArticleResolver, UsersService],
})
export class ArticlesModule { }
