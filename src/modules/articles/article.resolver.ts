import { NotFoundException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { GqlAuthGuard } from "../auth/guards/graphql-auth.guard";

import { Article } from "../database/entities/article.entity";
import { User } from "../database/entities/user.entity";

import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";


@Resolver(() => Article)
export class ArticleResolver {

    constructor(private articleService: ArticlesService) { }

    @Query(() => Article)
    async article(@Args('id') id: number): Promise<Article> {
        const article = await this.articleService.findById(id);
        if (!article) {
            throw new NotFoundException(id);
        }
        return article;
    }

    @Query(() => [Article])
    async articles(): Promise<Article[]> {
        const articles = await this.articleService.findAll();
        if (!articles) {
            throw new NotFoundException();
        }
        return articles;
    }

    @Query(() => [Article])
    @UseGuards(GqlAuthGuard)
    async myArticles(
        @CurrentUser() user: User,
    ): Promise<Article[]> {
        const articles = await this.articleService.findArticlesByUser(user.email);
        if (!articles) {
            throw new NotFoundException();
        }
        return articles;
    }

    @Mutation(() => Article)
    @UseGuards(GqlAuthGuard)
    async createArticle(
        @Args('createArticleDto') createArticleDto: CreateArticleDto,
        @CurrentUser() user: User,
    ): Promise<Article> {
        const article = await this.articleService.create(user.email, createArticleDto);
        return article;
    }

    @Mutation(() => Article)
    @UseGuards(GqlAuthGuard)
    async updateArticle(
        @Args('articleId') articleId: number,
        @Args('updateArticleDto') updateArticleDto: UpdateArticleDto,
        @CurrentUser() user: User,
    ): Promise<Article> {
        const article = await this.articleService.update(user.email, articleId, updateArticleDto);
        return article;
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    async removeArticle(
        @Args('articleId') articleId: number,
        @CurrentUser() user: User,
    ): Promise<Boolean> {
        await this.articleService.delete(user.email, articleId);
        return true
    }
}