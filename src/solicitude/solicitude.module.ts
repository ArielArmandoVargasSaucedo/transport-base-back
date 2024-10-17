import { Module } from '@nestjs/common';
import { SolicitudeService } from './solicitude.service';
import { SolicitudeController } from './solicitude.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitude } from './entities/solicitude.entity';
import { GroupTourModule } from 'src/group_tour/group_tour.module';
import { RouteModule } from 'src/route/route.module';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitude]), RouteModule, GroupTourModule],
  controllers: [SolicitudeController],
  providers: [SolicitudeService],
})
export class SolicitudeModule {}
