import { IsString, IsEmail } from 'class-validator';
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

    @IsString({ each: true })
    roles: UserRoleType[] = ['user'];
}