import { Test, TestingModule } from '@nestjs/testing';
import { TypeCarSituationController } from './type_car_situation.controller';
import { TypeCarSituationService } from './type_car_situation.service';

describe('TypeCarSituationController', () => {
  let controller: TypeCarSituationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeCarSituationController],
      providers: [TypeCarSituationService],
    }).compile();

    controller = module.get<TypeCarSituationController>(TypeCarSituationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
