import { Module } from '@nestjs/common';
import { ProgrammingTypeService } from './programming_type.service';
import { ProgrammingTypeController } from './programming_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgrammingType } from './entities/programming_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgrammingType])],
  controllers: [ProgrammingTypeController],
  providers: [ProgrammingTypeService],
})
export class ProgrammingTypeModule {}
