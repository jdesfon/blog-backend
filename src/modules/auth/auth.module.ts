import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtConstants } from 'src/constants';

@Module({
  exports: [AuthService],
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    // TODO REGISTER ASYNC AND USE FACTORY TO INJECT ENV VARIABLE
    // see https://docs.nestjs.com/graphql/quick-start#async-configuration
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '30d' }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController]
})
export class AuthModule { }
