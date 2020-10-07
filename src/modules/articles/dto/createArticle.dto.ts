import { Field, InputType } from "@nestjs/graphql";
import { User } from "src/modules/database/entities/user.entity";

@InputType()
export class CreateArticleDto {
    fk_user?: User;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field(() => [String])
    tags: string[];

    @Field()
    picture_url: string;

    @Field({ defaultValue: false })
    isPrivate: boolean;
}