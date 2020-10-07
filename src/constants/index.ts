export enum Provider {
    DATABASE_CONNECTION = 'DATABASE_CONNECTION'
}

export enum UserRole {
    ADMIN = 'admin',
    NORMAL = 'normal'
}

export const JwtConstants = {
    secret: process.env.JWT_SECRET || 'watermelonIsGood'
}