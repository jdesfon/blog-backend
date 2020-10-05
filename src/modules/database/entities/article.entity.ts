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
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.articles)
    fk_user: User;

    @Column("varchar", { length: 255 })
    title: string;

    @Column("varchar")
    picture_url: string;

    @Column("text")
    body: string;

    @Column('simple-array')
    tags: string[];

    @Column('boolean')
    isPrivate: boolean;

    @OneToMany(() => Comment, comment => comment.fk_article)
    comments: Comment[];

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}