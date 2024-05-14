import { Module } from '@nestjs/common';
import { ModChangeService } from './mod_change.service';
import { ModChangeController } from './mod_change.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModChange } from './entities/mod_change.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModChange])],
  controllers: [ModChangeController],
  providers: [ModChangeService],
})
export class ModChangeModule {}
