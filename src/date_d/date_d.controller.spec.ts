import { Test, TestingModule } from '@nestjs/testing';
import { DateDController } from './date_d.controller';
import { DateDService } from './date_d.service';

describe('DateDController', () => {
  let controller: DateDController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DateDController],
      providers: [DateDService],
    }).compile();

    controller = module.get<DateDController>(DateDController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
