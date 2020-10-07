import { Field, ObjectType, ID } from '@nestjs/graphql';
import { UserRole } from 'src/constants';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Article } from './article.entity';
import { Comment } from './comment.entity';

export type UserRoleType = "normal" | "admin"

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

    @Field()
    @Column("varchar", { default: UserRole.NORMAL })
    role: UserRoleType;

    @Field(() => [Article])
    @OneToMany(() => Article, article => article.fk_user)
    articles: Article[];

    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.fk_user)
    comments: Comment[];
}