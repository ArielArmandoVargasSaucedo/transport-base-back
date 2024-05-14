import { Module } from '@nestjs/common';
import { DateDService } from './date_d.service';
import { DateDController } from './date_d.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateD } from './entities/date_d.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DateD])],
  controllers: [DateDController],
  providers: [DateDService],
})
export class DateDModule {}
