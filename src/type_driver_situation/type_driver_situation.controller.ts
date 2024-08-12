import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { TypeDriverSituationService } from './type_driver_situation.service';
import { CreateTypeDriverSituationDto } from './dto/create-type_driver_situation.dto';
import { UpdateTypeDriverSituationDto } from './dto/update-type_driver_situation.dto';

@Controller('type-driver-situation')
export class TypeDriverSituationController {
  constructor(private readonly typeDriverSituationService: TypeDriverSituationService) {}

  @Post()
  create(@Body() createTypeDriverSituationDto: CreateTypeDriverSituationDto) {
    return this.typeDriverSituationService.create(createTypeDriverSituationDto);
  }
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query("type_ds_name") type_ds_name: string) {
    return await this.typeDriverSituationService.findAll(type_ds_name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeDriverSituationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDriverSituationDto: UpdateTypeDriverSituationDto) {
    return this.typeDriverSituationService.update(+id, updateTypeDriverSituationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeDriverSituationService.remove(+id);
  }
}
