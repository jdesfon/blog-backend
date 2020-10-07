import { Field, InputType } from "@nestjs/graphql";
import { Article } from "src/modules/database/entities/article.entity";
import { User } from "src/modules/database/entities/user.entity";

@InputType()
export class CreateCommentDto {
    fk_user?: User;

    fk_article?: Article;

    @Field()
    body: string;
}