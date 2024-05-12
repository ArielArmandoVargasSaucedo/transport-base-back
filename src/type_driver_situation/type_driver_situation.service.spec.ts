import { Test, TestingModule } from '@nestjs/testing';
import { TypeDriverSituationService } from './type_driver_situation.service';

describe('TypeDriverSituationService', () => {
  let service: TypeDriverSituationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeDriverSituationService],
    }).compile();

    service = module.get<TypeDriverSituationService>(TypeDriverSituationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
