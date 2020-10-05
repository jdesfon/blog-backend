import { createConnection } from 'typeorm';
import { Provider } from '../../../constants';
import { entities } from '../entities';

export const databaseProviders = [
    {
        provide: Provider.DATABASE_CONNECTION,
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'totem',
            password: 'candidate',
            database: 'myblog',
            entities,
            synchronize: true,
            logging: true,
        })
    }
];