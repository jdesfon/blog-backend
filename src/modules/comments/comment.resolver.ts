import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { GqlAuthGuard } from "../auth/guards/graphql-auth.guard";
import { Comment } from '../database/entities/comment.entity';
import { User } from "../database/entities/user.entity";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/createComment.dto";
import { UpdateCommentDto } from "./dto/updateComment.dto";

@Resolver(() => Comment)
export class CommentResolver {

    constructor(private commentsService: CommentsService) { }

    @Mutation(() => Comment)
    @UseGuards(GqlAuthGuard)
    async createComment(
        @Args('articleId') articleId: number,
        @Args('createCommentDto') createCommentDto: CreateCommentDto,
        @CurrentUser() user: User,
    ): Promise<Comment> {
        const comment = this.commentsService.create(user.email, articleId, createCommentDto)
        return comment;
    }

    @Mutation(() => Comment)
    @UseGuards(GqlAuthGuard)
    async updateArticle(
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