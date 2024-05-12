import { Test, TestingModule } from '@nestjs/testing';
import { TypeDriverSituationController } from './type_driver_situation.controller';
import { TypeDriverSituationService } from './type_driver_situation.service';

describe('TypeDriverSituationController', () => {
  let controller: TypeDriverSituationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeDriverSituationController],
      providers: [TypeDriverSituationService],
    }).compile();

    controller = module.get<TypeDriverSituationController>(TypeDriverSituationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
