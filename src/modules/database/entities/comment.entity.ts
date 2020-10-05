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
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.comments)
    fk_user: User;

    @ManyToOne(() => Article, article => article.comments)
    fk_article: Article;

    @Column("varchar", { length: 255 })
    body: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}