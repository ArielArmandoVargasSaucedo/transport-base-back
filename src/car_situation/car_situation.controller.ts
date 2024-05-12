import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.carSituationService.findAll();
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
