import { Test, TestingModule } from '@nestjs/testing';
import { ProgrammingTypeService } from './programming_type.service';

describe('ProgrammingTypeService', () => {
  let service: ProgrammingTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgrammingTypeService],
    }).compile();

    service = module.get<ProgrammingTypeService>(ProgrammingTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
