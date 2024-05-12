import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
