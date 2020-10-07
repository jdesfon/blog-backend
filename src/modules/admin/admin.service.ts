import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ArticlesService } from '../articles/articles.service';
import { CommentsService } from '../comments/comments.service';
import { User, UserRoleType } from '../database/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
    constructor(
        private usersService: UsersService,
        private articlesService: ArticlesService,
        private commentsService: CommentsService
    ) { }

    async updateUserRole(userEmail: string, role: UserRoleType): Promise<User> {
        const user = await this.usersService.updateRole(userEmail, role);
        return user;
    }

    async deleteArticleById(articleId: number): Promise<Boolean> {
        await this.articlesService.deleteById(articleId);
        return true;
    }

    async deleteCommentById(commentId: number): Promise<Boolean> {
        await this.commentsService.deleteById(commentId);
        return true;
    }

}
