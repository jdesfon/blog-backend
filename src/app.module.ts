import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersService } from './modules/users/users.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthController } from './modules/auth/auth.controller';
import { databaseProviders } from './modules/database/providers/database.providers';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.development.env'}), DatabaseModule, AuthModule, UsersModule],
  controllers: [AppController, AuthController],
  providers: [...databaseProviders, UsersService],
})
export class AppModule { }
