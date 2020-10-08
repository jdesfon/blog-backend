import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConfigService } from '../../config/db-config.service';
import { databaseProviders } from './providers/database.providers';

@Module({
    imports: [ConfigModule],
    providers: [DbConfigService, ...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }