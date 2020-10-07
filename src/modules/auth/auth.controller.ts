import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.gard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signUp(@Body(new ValidationPipe()) body: CreateUserDto) {
        await this.authService.registerUser(body);
        return 'OK'
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async signIn(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
