import { Module } from '@nestjs/common';
import { from } from 'rxjs';
import { ArticlesService } from '../articles/articles.service';
import { DatabaseModule } from '../database/database.module';
import { CommentResolver } from './comment.resolver';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { UsersService } from '../users/users.service';

@Module({
    imports: [DatabaseModule],
    providers: [ArticlesService, CommentsService, UsersService, CommentResolver],
    controllers: [CommentsController],
})
export class CommentsModule { }
