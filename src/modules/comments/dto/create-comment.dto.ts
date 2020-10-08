import { Field, InputType } from "@nestjs/graphql";
import { Article } from "../../../modules/database/entities/article.entity";
import { User } from "../../../modules/database/entities/user.entity";

@InputType()
export class CreateCommentDto {
    fk_user?: User;

    fk_article?: Article;

    @Field()
    body: string;
}