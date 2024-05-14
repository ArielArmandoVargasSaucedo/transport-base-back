import { Test, TestingModule } from '@nestjs/testing';
import { ProgrammingTypeController } from './programming_type.controller';
import { ProgrammingTypeService } from './programming_type.service';

describe('ProgrammingTypeController', () => {
  let controller: ProgrammingTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgrammingTypeController],
      providers: [ProgrammingTypeService],
    }).compile();

    controller = module.get<ProgrammingTypeController>(ProgrammingTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
