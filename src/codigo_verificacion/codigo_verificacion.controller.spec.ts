import { Test, TestingModule } from '@nestjs/testing';
import { CodigoVerificacionController } from './codigo_verificacion.controller';
import { CodigoVerificacionService } from './codigo_verificacion.service';

describe('CodigoVerificacionController', () => {
  let controller: CodigoVerificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodigoVerificacionController],
      providers: [CodigoVerificacionService],
    }).compile();

    controller = module.get<CodigoVerificacionController>(CodigoVerificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
