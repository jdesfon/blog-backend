import { NotFoundException, UseGuards } from "@nestjs/common";
import { Query, Resolver, Mutation, Args } from "@nestjs/graphql";

import { GqlAuthGuard } from "../auth/guards/graphql-auth.guard";
import { CurrentUser } from "../../decorators/current-user.decorator";

import { Comment } from '../database/entities/comment.entity';
import { User } from "../database/entities/user.entity";

import { CommentsService } from "./comments.service";

import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Resolver(() => Comment)
export class CommentResolver {

    constructor(private commentsService: CommentsService) { }

    @Query(() => [Comment])
    async comments(): Promise<Comment[]> {
        const comments = await this.commentsService.findAll()
        if (!comments) {
            throw new NotFoundException()
        }
        return comments;
    }

    @Query(() => [Comment])
    async commentsByArticle(
        @Args('articleId') articleId: number,
    ): Promise<Comment[]> {
        const comments = await this.commentsService.findByArticle(articleId);
        if (!comments) {
            throw new NotFoundException();
        }
        return comments;
    }

    @Mutation(() => Comment)
    @UseGuards(GqlAuthGuard)
    async createComment(
        @Args('articleId') articleId: number,
        @Args('createCommentDto') createCommentDto: CreateCommentDto,
        @CurrentUser() user: User,
    ): Promise<Comment> {
        const comment = this.commentsService.create(user.email, articleId, createCommentDto);
        return comment;
    }

    @Mutation(() => Comment)
    @UseGuards(GqlAuthGuard)
    async updateComment(
        @Args('commentId') commentId: number,
        @Args('updateCommentDto') updateCommentDto: UpdateCommentDto,
        @CurrentUser() user: User,
    ): Promise<Comment> {
        const comment = await this.commentsService.update(user.email, commentId, updateCommentDto);
        return comment;
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    async removeComment(
        @Args('commentId') commentId: number,
        @CurrentUser() user: User,
    ): Promise<Boolean> {
        await this.commentsService.delete(user.email, commentId);
        return true;
    }
}