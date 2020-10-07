import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
    Entity,
    CreateDateColumn,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany, ManyToOne
} from 'typeorm';

import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity({ name: 'articles' })
@ObjectType()
export class Article {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.articles)
    fk_user: User;

    @Field()
    @Column("varchar", { length: 255 })
    title: string;

    @Field()
    @Column("varchar")
    picture_url: string;

    @Field()
    @Column("text")
    body: string;

    @Field(() => [String])
    @Column('simple-array')
    tags: string[];

    @Field()
    @Column('boolean')
    isPrivate: boolean;

    @Field(() => Comment, { nullable: true })
    @OneToMany(() => Comment, comment => comment.fk_article, { onDelete: 'CASCADE' })
    comments: Comment[];

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
}