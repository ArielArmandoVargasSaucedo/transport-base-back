import { Module } from '@nestjs/common';
import { GroupTourService } from './group_tour.service';
import { GroupTourController } from './group_tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupTour } from './entities/group_tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupTour])],
  controllers: [GroupTourController],
  providers: [GroupTourService],
  exports: [GroupTourService]
})
export class GroupTourModule {}
