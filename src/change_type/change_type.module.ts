import { Module } from '@nestjs/common';
import { ChangeTypeService } from './change_type.service';
import { ChangeTypeController } from './change_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChangeType } from './entities/change_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChangeType])],
  controllers: [ChangeTypeController],
  providers: [ChangeTypeService],
})
export class ChangeTypeModule {}
