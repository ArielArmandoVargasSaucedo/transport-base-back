import { Module } from '@nestjs/common';
import { TypeCarSituationService } from './type_car_situation.service';
import { TypeCarSituationController } from './type_car_situation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCarSituation } from './entities/type_car_situation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeCarSituation])],
  controllers: [TypeCarSituationController],
  providers: [TypeCarSituationService],
})
export class TypeCarSituationModule {}
