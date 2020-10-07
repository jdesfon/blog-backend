import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
    CreateDateColumn,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Article } from './article.entity';
import { User } from './user.entity';

@Entity({ name: 'comments' })
@ObjectType()
export class Comment {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.comments)
    fk_user: User;

    @Field(() => Article)
    @ManyToOne(() => Article, article => article.comments)
    fk_article: Article;

    @Field()
    @Column("text")
    body: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
}