import { DbConfigService } from '../../../config/db-config.service';
import { createConnection } from 'typeorm';
import { Provider } from '../../../constants';
import { entities } from '../entities';

export const databaseProviders = [
    {
        provide: Provider.DATABASE_CONNECTION,
        inject: [DbConfigService],
        useFactory: async (dbConfigService: DbConfigService) => await createConnection({
            type: 'postgres',
            host: dbConfigService.host,
            port: dbConfigService.port,
            username: dbConfigService.username,
            password: dbConfigService.password,
            database: dbConfigService.name,
            entities,
        })
    }
];