import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CarSituationService } from './car_situation.service';
import { CreateCarSituationDto } from './dto/create-car_situation.dto';
import { UpdateCarSituationDto } from './dto/update-car_situation.dto';

@Controller('car-situation')
export class CarSituationController {
  constructor(private readonly carSituationService: CarSituationService) {}

  @Post()
  create(@Body() createCarSituationDto: CreateCarSituationDto) {
    return this.carSituationService.create(createCarSituationDto);
  }

  @Get()
  findAll(@Query("id_car") id_car: string, @Query("id_aut_type_cs") id_aut_type_cs: string, @Query("date") insertDate: string) {
    const date = new Date(insertDate);
    return this.carSituationService.findAll(id_car ? +id_car: undefined, id_aut_type_cs ? +id_aut_type_cs: undefined, date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carSituationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarSituationDto: UpdateCarSituationDto) {
    return this.carSituationService.update(+id, updateCarSituationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carSituationService.remove(+id);
  }
}
