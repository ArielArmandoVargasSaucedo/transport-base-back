import { Test, TestingModule } from '@nestjs/testing';
import { TypeCarSituationService } from './type_car_situation.service';

describe('TypeCarSituationService', () => {
  let service: TypeCarSituationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeCarSituationService],
    }).compile();

    service = module.get<TypeCarSituationService>(TypeCarSituationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
