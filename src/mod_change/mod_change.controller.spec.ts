import { Test, TestingModule } from '@nestjs/testing';
import { ModChangeController } from './mod_change.controller';
import { ModChangeService } from './mod_change.service';

describe('ModChangeController', () => {
  let controller: ModChangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModChangeController],
      providers: [ModChangeService],
    }).compile();

    controller = module.get<ModChangeController>(ModChangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
