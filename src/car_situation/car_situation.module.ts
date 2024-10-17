import { Module } from '@nestjs/common';
import { CarSituationService } from './car_situation.service';
import { CarSituationController } from './car_situation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarSituation } from './entities/car_situation.entity';
import { TypeCarSituationModule } from 'src/type_car_situation/type_car_situation.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarSituation]), TypeCarSituationModule],
  controllers: [CarSituationController],
  providers: [CarSituationService],
  exports: [CarSituationService]
})
export class CarSituationModule {}
