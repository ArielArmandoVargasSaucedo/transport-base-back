import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudeController } from './solicitude.controller';
import { SolicitudeService } from './solicitude.service';

describe('SolicitudeController', () => {
  let controller: SolicitudeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudeController],
      providers: [SolicitudeService],
    }).compile();

    controller = module.get<SolicitudeController>(SolicitudeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
