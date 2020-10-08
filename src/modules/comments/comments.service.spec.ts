import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesModule } from '../articles/articles.module';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { ArticlesService } from '../articles/articles.service';
import { UsersService } from '../users/users.service';
import { CommentResolver } from './comment.resolver';
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ArticlesModule, UsersModule],
      providers: [ArticlesService, CommentsService, UsersService, CommentResolver],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
