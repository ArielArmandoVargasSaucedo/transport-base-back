import { Test, TestingModule } from '@nestjs/testing';
import { GroupTourService } from './group_tour.service';

describe('GroupTourService', () => {
  let service: GroupTourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTourService],
    }).compile();

    service = module.get<GroupTourService>(GroupTourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
