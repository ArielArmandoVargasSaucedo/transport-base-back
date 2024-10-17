import { Module } from '@nestjs/common';
import { DriverSituationService } from './driver_situation.service';
import { DriverSituationController } from './driver_situation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverSituation } from './entities/driver_situation.entity';
import { TypeDriverSituationModule } from 'src/type_driver_situation/type_driver_situation.module';

@Module({
  imports: [TypeOrmModule.forFeature([DriverSituation]), TypeDriverSituationModule],
  controllers: [DriverSituationController],
  providers: [DriverSituationService],
  exports: [DriverSituationService]
})
export class DriverSituationModule {}
