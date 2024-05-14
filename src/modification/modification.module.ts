import { Module } from '@nestjs/common';
import { ModificationService } from './modification.service';
import { ModificationController } from './modification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modification } from './entities/modification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Modification])],
  controllers: [ModificationController],
  providers: [ModificationService],
})
export class ModificationModule {}
