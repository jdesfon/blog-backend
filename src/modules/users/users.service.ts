import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Provider } from '../../constants';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(@Inject(Provider.DATABASE_CONNECTION) private db: Connection) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const userEntity = this.db.manager.create(User, createUserDto);
        const user = await this.db.manager.save<User>(userEntity);
        return user;
    }

    async findOne(email: string): Promise<User | undefined> {
        const user = await this.db.getRepository(User).findOne({ email });
        return user;
    }
}
