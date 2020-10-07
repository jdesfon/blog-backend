import { Module } from '@nestjs/common';
import { ArticlesService } from '../articles/articles.service';
import { ArticlesModule } from '../articles/articles.module';
import { DatabaseModule } from '../database/database.module';
import { CommentResolver } from './comment.resolver';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { UsersService } from '../users/users.service';

@Module({
    imports: [DatabaseModule, ArticlesModule],
    providers: [ArticlesService, CommentsService, UsersService, CommentResolver],
    controllers: [CommentsController],
})
export class CommentsModule { }
