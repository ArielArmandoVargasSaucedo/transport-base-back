import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitudeService } from './solicitude.service';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto';

@Controller('solicitude')
export class SolicitudeController {
  constructor(private readonly solicitudeService: SolicitudeService) {}

  @Post()
  create(@Body() createSolicitudeDto: CreateSolicitudeDto) {
    return this.solicitudeService.create(createSolicitudeDto);
  }

  @Get()
  findAll() {
    return this.solicitudeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudeDto: UpdateSolicitudeDto) {
    return this.solicitudeService.update(+id, updateSolicitudeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudeService.remove(+id);
  }
}
