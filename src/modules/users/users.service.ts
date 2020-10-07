import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Provider } from '../../constants';
import { User, UserRoleType } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@Inject(Provider.DATABASE_CONNECTION) private db: Connection) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const userEntity = this.db.manager.create(User, createUserDto);
        const user = await this.db.manager.save<User>(userEntity);
        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.db.getRepository(User).findOne({ email });
        return user;
    }

    async findById(id: number): Promise<User | undefined> {
        const user = await this.db.getRepository(User).findOne(id);
        return user;
    }

    async updateRole(userEmail: string, role: UserRoleType): Promise<User> {
        await this.db.manager.update(User, { email: userEmail }, { role });
        const updatedUser = await this.findByEmail(userEmail);
        return updatedUser;
    }
}
