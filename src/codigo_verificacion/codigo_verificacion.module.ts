import { Module } from '@nestjs/common';
import { CodigoVerificacionService } from './codigo_verificacion.service';
import { CodigoVerificacionController } from './codigo_verificacion.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodigoVerficacion } from './entities/codigo_verificacion.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CodigoVerficacion]), ConfigModule.forRoot()],
  controllers: [CodigoVerificacionController],
  providers: [CodigoVerificacionService],
  exports: [CodigoVerificacionService]
})
export class CodigoVerificacionModule { }
