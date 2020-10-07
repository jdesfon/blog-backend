import { Module } from '@nestjs/common';

import { ArticlesModule } from '../articles/articles.module';
import { CommentsModule } from '../comments/comments.module';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';

import { AdminService } from './admin.service';
import { ArticlesService } from '../articles/articles.service';
import { CommentsService } from '../comments/comments.service';
import { UsersService } from '../users/users.service';

import { AdminResolver } from './admin.resolver';

@Module({
  imports: [DatabaseModule, UsersModule, ArticlesModule, CommentsModule],
  providers: [AdminService, ArticlesService, CommentsService, UsersService, AdminResolver]
})
export class AdminModule { }
