import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeCarSituationService } from './type_car_situation.service';
import { CreateTypeCarSituationDto } from './dto/create-type_car_situation.dto';
import { UpdateTypeCarSituationDto } from './dto/update-type_car_situation.dto';

@Controller('type-car-situation')
export class TypeCarSituationController {
  constructor(private readonly typeCarSituationService: TypeCarSituationService) {}

  @Post()
  create(@Body() createTypeCarSituationDto: CreateTypeCarSituationDto) {
    return this.typeCarSituationService.create(createTypeCarSituationDto);
  }

  @Get()
  findAll() {
    return this.typeCarSituationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeCarSituationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeCarSituationDto: UpdateTypeCarSituationDto) {
    return this.typeCarSituationService.update(+id, updateTypeCarSituationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeCarSituationService.remove(+id);
  }
}
