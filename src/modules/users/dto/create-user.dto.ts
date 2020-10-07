import { IsString, IsEmail } from 'class-validator';
import { UserRole } from 'src/constants';
import { UserRoleType } from 'src/modules/database/entities/user.entity';

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