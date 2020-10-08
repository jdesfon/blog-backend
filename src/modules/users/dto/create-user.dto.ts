import { IsString, IsEmail } from 'class-validator';
import { UserRole } from '../../../constants';
import { UserRoleType } from '../../database/entities/user.entity';

export class CreateUserDto {
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: UserRoleType = UserRole.NORMAL;
}