import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateArticleDto {

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    body?: string;

    @Field(() => [String], { nullable: true })
    tags?: string[];

    @Field({ nullable: true })
    picture_url?: string;

    @Field({ nullable: true })
    isPrivate?: boolean;
}