import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCommentDto {

    @Field({ nullable: true })
    body?: string;

}