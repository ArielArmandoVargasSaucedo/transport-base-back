import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverSituationService } from './driver_situation.service';
import { CreateDriverSituationDto } from './dto/create-driver_situation.dto';
import { UpdateDriverSituationDto } from './dto/update-driver_situation.dto';

@Controller('driver-situation')
export class DriverSituationController {
  constructor(private readonly driverSituationService: DriverSituationService) {}

  @Post()
  create(@Body() createDriverSituationDto: CreateDriverSituationDto) {
    return this.driverSituationService.create(createDriverSituationDto);
  }

  @Get()
  findAll() {
    return this.driverSituationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverSituationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverSituationDto: UpdateDriverSituationDto) {
    return this.driverSituationService.update(+id, updateDriverSituationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverSituationService.remove(+id);
  }
}
