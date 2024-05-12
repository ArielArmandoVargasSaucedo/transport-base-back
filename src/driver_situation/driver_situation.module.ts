import { Module } from '@nestjs/common';
import { DriverSituationService } from './driver_situation.service';
import { DriverSituationController } from './driver_situation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverSituation } from './entities/driver_situation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriverSituation])],
  controllers: [DriverSituationController],
  providers: [DriverSituationService],
})
export class DriverSituationModule {}
