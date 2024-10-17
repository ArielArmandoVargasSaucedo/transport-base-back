import { Test, TestingModule } from '@nestjs/testing';
import { CodigoVerificacionService } from './codigo_verificacion.service';

describe('CodigoVerificacionService', () => {
  let service: CodigoVerificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodigoVerificacionService],
    }).compile();

    service = module.get<CodigoVerificacionService>(CodigoVerificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
