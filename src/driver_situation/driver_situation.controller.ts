import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  async findAll(@Query("id_driver") id_driver: string, @Query("id_aut_type_ds") id_aut_type_ds: string, @Query("date") insertDate: string) {
    const date = new Date(insertDate);
    return await this.driverSituationService.findAll(id_driver ? +id_driver: undefined, id_aut_type_ds ? +id_aut_type_ds: undefined, date);
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
