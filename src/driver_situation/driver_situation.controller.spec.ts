import { Test, TestingModule } from '@nestjs/testing';
import { DriverSituationController } from './driver_situation.controller';
import { DriverSituationService } from './driver_situation.service';

describe('DriverSituationController', () => {
  let controller: DriverSituationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverSituationController],
      providers: [DriverSituationService],
    }).compile();

    controller = module.get<DriverSituationController>(DriverSituationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
