import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbConfigService {

    constructor(private configService: ConfigService) { }

    get host(): string {
        return this.configService.get<string>('db.host');
    }

    get port(): number {
        return Number(this.configService.get<string>('db.port'));
    }

    get name(): string {
        return this.configService.get<string>('db.name');
    }

    get username(): string {
        return this.configService.get<string>('db.username');
    }

    get password(): string {
        return this.configService.get<string>('db.password');
    }
}
