import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}