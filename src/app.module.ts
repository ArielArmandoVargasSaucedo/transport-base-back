import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DriverModule } from './driver/driver.module';
import { DriverSituationModule } from './driver_situation/driver_situation.module';
import { TypeDriverSituationModule } from './type_driver_situation/type_driver_situation.module';
import { CarModule } from './car/car.module';
import { CarSituationModule } from './car_situation/car_situation.module';
import { TypeCarSituationModule } from './type_car_situation/type_car_situation.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { SolicitudeModule } from './solicitude/solicitude.module';
import { ProgrammingTypeModule } from './programming_type/programming_type.module';
import { GroupTourModule } from './group_tour/group_tour.module';
import { RouteModule } from './route/route.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { CodigoVerificacionModule } from './codigo_verificacion/codigo_verificacion.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
      }),
    }),
    DriverModule,
    DriverSituationModule,
    TypeDriverSituationModule,
    CarModule,
    CarSituationModule,
    TypeCarSituationModule,
    UserModule,
    RoleModule,
    SolicitudeModule,
    ProgrammingTypeModule,
    GroupTourModule,
    RouteModule,
    AuthModule,
    MailerModule,
    CodigoVerificacionModule
  ],
})
export class AppModule {}
