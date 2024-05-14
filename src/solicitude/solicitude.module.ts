import { Module } from '@nestjs/common';
import { SolicitudeService } from './solicitude.service';
import { SolicitudeController } from './solicitude.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitude } from './entities/solicitude.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitude])],
  controllers: [SolicitudeController],
  providers: [SolicitudeService],
})
export class SolicitudeModule {}
