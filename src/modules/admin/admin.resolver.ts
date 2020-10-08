import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../../decorators/current-user.decorator";
import { User, UserRoleType } from "../database/entities/user.entity";
import { AdminService } from "./admin.service";
import { UserRole } from "../../constants";
import { Auth } from "../../decorators/auth.decorator";

@Resolver()
export class AdminResolver {
    constructor(
        private adminService: AdminService,
    ) { }

    @Mutation(() => User)
    @Auth(UserRole.ADMIN)
    async updateUserRole(
        @Args('role') role: UserRoleType,
        @CurrentUser() user: User,
    ): Promise<User> {
        return this.adminService.updateUserRole(user.email, role);
    }

    @Mutation(() => Boolean)
    @Auth(UserRole.ADMIN)
    async removeArticleAsAdmin(
        @Args('articleId') articleId: number,
    ): Promise<Boolean> {
        return this.adminService.deleteArticleById(articleId);
    }

    @Mutation(() => Boolean)
    @Auth(UserRole.ADMIN)
    async removeCommentAsAdmin(
        @Args('commentId') commentId: number,
    ): Promise<Boolean> {
        return this.adminService.deleteCommentById(commentId);
    }
}