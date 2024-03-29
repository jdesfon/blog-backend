import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DbConfigService } from './db-config.service';

describe('DbConfigService', () => {
  let service: DbConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [DbConfigService],
    }).compile();

    service = module.get<DbConfigService>(DbConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
