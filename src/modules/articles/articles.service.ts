import { Inject, Injectable } from '@nestjs/common';
import { Provider } from '../../constants';
import { Connection, DeleteResult } from 'typeorm';
import { Article } from '../database/entities/article.entity';
import { UsersService } from '../users/users.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {

    constructor(
        @Inject(Provider.DATABASE_CONNECTION) private db: Connection,
        private usersService: UsersService
    ) { }

    async findById(articleId: number): Promise<Article> {
        return this.db.getRepository(Article).findOne(articleId);
    }

    async findAll(): Promise<Article[]> {
        return this.db.getRepository(Article).find({ isPrivate: false });
    }

    async findArticlesByUser(userEmail: string): Promise<Article[]> {
        const user = await this.usersService.findByEmail(userEmail);
        return this.db.getRepository(Article).find({ fk_user: user });
    }

    async create(userEmail: string, createArticleDto: CreateArticleDto): Promise<Article> {
        const user = await this.usersService.findByEmail(userEmail);
        createArticleDto.fk_user = user;

        const articleEntity = this.db.manager.create(Article, createArticleDto);
        const article = await this.db.manager.save(articleEntity);
        return article;
    }

    async update(userEmail: string, articleId: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
        const user = await this.usersService.findByEmail(userEmail);
        await this.db.manager.update(Article, { id: articleId, fk_user: user }, Object.assign({}, updateArticleDto));

        const updatedArticle = await this.findById(articleId);
        return updatedArticle;
    }

    async delete(userEmail: string, articleId: number): Promise<DeleteResult> {
        const user = await this.usersService.findByEmail(userEmail);
        return await this.db.manager.delete(Article, { id: articleId, fk_user: user });
    }

    async deleteById(articleId: number): Promise<DeleteResult> {
        return await this.db.manager.delete(Article, { id: articleId });
    }
}
