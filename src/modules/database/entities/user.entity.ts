import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Article } from './article.entity';
import { Comment } from './comment.entity';

export type UserRoleType = "admin" | "user"

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 255 })
    firstname: string;

    @Column("varchar", { length: 255 })
    lastname: string;

    @Column("varchar", { unique: true })
    email: string;

    @Column("varchar")
    password: string;

    @Column("simple-array", { default: ['user'] })
    roles: UserRoleType[]

    @OneToMany(() => Article, article => article.fk_user)
    articles: Article[];

    @OneToMany(() => Comment, comment => comment.fk_user)
    comments: Comment[];
}