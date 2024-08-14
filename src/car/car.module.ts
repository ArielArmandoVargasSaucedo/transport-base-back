import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { CarSituationModule } from 'src/car_situation/car_situation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), CarSituationModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
