import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { DriverSituation } from 'src/driver_situation/entities/driver_situation.entity';
import { DriverSituationModule } from 'src/driver_situation/driver_situation.module';
import { CarModule } from 'src/car/car.module';

@Module({
  imports: [TypeOrmModule.forFeature([Driver]), DriverSituationModule, CarModule],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService]
})
export class DriverModule {}
