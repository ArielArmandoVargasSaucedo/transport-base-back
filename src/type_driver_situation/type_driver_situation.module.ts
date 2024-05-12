import { Module } from '@nestjs/common';
import { TypeDriverSituationService } from './type_driver_situation.service';
import { TypeDriverSituationController } from './type_driver_situation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeDriverSituation } from './entities/type_driver_situation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeDriverSituation])],
  controllers: [TypeDriverSituationController],
  providers: [TypeDriverSituationService],
})
export class TypeDriverSituationModule {}
