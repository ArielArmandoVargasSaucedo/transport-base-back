import { Test, TestingModule } from '@nestjs/testing';
import { ModChangeService } from './mod_change.service';

describe('ModChangeService', () => {
  let service: ModChangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModChangeService],
    }).compile();

    service = module.get<ModChangeService>(ModChangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
