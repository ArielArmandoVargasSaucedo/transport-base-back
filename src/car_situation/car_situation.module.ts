import { Module } from '@nestjs/common';
import { CarSituationService } from './car_situation.service';
import { CarSituationController } from './car_situation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarSituation } from './entities/car_situation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarSituation])],
  controllers: [CarSituationController],
  providers: [CarSituationService],
})
export class CarSituationModule {}
