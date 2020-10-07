import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Article } from './article.entity';
import { Comment } from './comment.entity';

export type UserRoleType = "admin" | "user"

@ObjectType()
@Entity({ name: 'users' })
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("varchar", { length: 255 })
    firstname: string;

    @Field()
    @Column("varchar", { length: 255 })
    lastname: string;

    @Field()
    @Column("varchar", { unique: true })
    email: string;

    @Field()
    @Column("varchar")
    password: string;

    @Field(() => [String])
    @Column("simple-array", { default: ['user'] })
    roles: UserRoleType[]

    @Field(() => [Article])
    @OneToMany(() => Article, article => article.fk_user)
    articles: Article[];

    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.fk_user)
    comments: Comment[];
}