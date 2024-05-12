import { Test, TestingModule } from '@nestjs/testing';
import { CarSituationController } from './car_situation.controller';
import { CarSituationService } from './car_situation.service';

describe('CarSituationController', () => {
  let controller: CarSituationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarSituationController],
      providers: [CarSituationService],
    }).compile();

    controller = module.get<CarSituationController>(CarSituationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
