import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import omit from 'lodash.omit';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../database/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);

        if (user && bcrypt.compareSync(password, user.password)) {
            const result = omit(user, ['password']);
            return result as User;
        }

        return null;
    }

    async registerUser(userInput: CreateUserDto) {
        const hashedPassword = bcrypt.hashSync(userInput.password, 8);
        Object.assign(userInput, { password: hashedPassword })
        await this.usersService.create(userInput);
    }

    async login(user: User) {
        const payload = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
