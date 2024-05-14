import { Test, TestingModule } from '@nestjs/testing';
import { GroupTourController } from './group_tour.controller';
import { GroupTourService } from './group_tour.service';

describe('GroupTourController', () => {
  let controller: GroupTourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupTourController],
      providers: [GroupTourService],
    }).compile();

    controller = module.get<GroupTourController>(GroupTourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
