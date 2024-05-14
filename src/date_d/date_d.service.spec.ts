import { Test, TestingModule } from '@nestjs/testing';
import { DateDService } from './date_d.service';

describe('DateDService', () => {
  let service: DateDService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateDService],
    }).compile();

    service = module.get<DateDService>(DateDService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
