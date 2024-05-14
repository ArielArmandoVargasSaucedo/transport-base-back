import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudeService } from './solicitude.service';

describe('SolicitudeService', () => {
  let service: SolicitudeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitudeService],
    }).compile();

    service = module.get<SolicitudeService>(SolicitudeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
