import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query("id_car") id_car: string, @Query("id_aut_prog_type") id_aut_prog_type: string, 
  @Query("id_group") id_group: string,
  @Query("dateD") dateD: Date, @Query("id_driver") id_driver: string) {
    return await this.solicitudeService.findAll(id_car ? +id_car: undefined, 
      id_aut_prog_type ? +id_aut_prog_type: undefined, id_group ? +id_group: undefined, 
      id_driver ? +id_driver : undefined , dateD);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudeService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSolicitudeDto: UpdateSolicitudeDto) {
    console.log(id)
    return await this.solicitudeService.update(+id, updateSolicitudeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudeService.remove(+id);
  }
}
