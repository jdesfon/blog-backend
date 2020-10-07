import { Inject, Injectable } from '@nestjs/common';
import { Provider } from 'src/constants';
import { Connection, DeleteResult } from 'typeorm';
import { Article } from '../database/entities/article.entity';
import { User } from '../database/entities/user.entity';
import { Comment } from '../database/entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ArticlesService } from '../articles/articles.service';
import { UsersService } from '../users/users.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { NumberScalarMode } from '@nestjs/graphql';

@Injectable()
export class CommentsService {
    constructor(
        @Inject(Provider.DATABASE_CONNECTION) private db: Connection,
        private articlesService: ArticlesService,
        private usersService: UsersService,
    ) { }

    async findAll(): Promise<Comment[]> {
        return await this.db.getRepository(Comment).find();
    }

    async findById(commentId: number): Promise<Comment> {
        return await this.db.getRepository(Comment).findOne({ id: commentId });
    }

    async findByArticle(articleId: number): Promise<Comment[]> {
        const article = await this.articlesService.findById(articleId);
        return await this.db.getRepository(Comment).find({ fk_article: article });
    }

    async create(
        userEmail: string,
        articleId: number,
        createCommentDto: CreateCommentDto
    ): Promise<Comment> {
        const user = await this.usersService.findByEmail(userEmail)
        createCommentDto.fk_user = user;

        const article = await this.articlesService.findById(articleId);
        createCommentDto.fk_article = article;

        const commentEntity = this.db.manager.create(Comment, createCommentDto);
        const comment = await this.db.manager.save(commentEntity);
        return comment;
    }

    async update(userEmail, commentId: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const user = await this.usersService.findByEmail(userEmail);
        await this.db.manager.update(Comment, { id: commentId, fk_user: user }, Object.assign({}, updateCommentDto))

        const updatedComment = await this.findById(commentId);
        return updatedComment;
    }

    async delete(userEmail: string, commentId: number): Promise<DeleteResult> {
        const user = await this.db.getRepository(User).findOne({ email: userEmail });
        return await this.db.manager.delete(Comment, { id: commentId, fk_user: user });
    }

    async deleteById(commentId: number): Promise<DeleteResult> {
        return await this.db.manager.delete(Comment, { id: commentId });
    }
}
