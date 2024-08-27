import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query, ParseIntPipe } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @Post()
  async create(@Body() createDriverDto: CreateDriverDto) {
    return await this.driverService.create(createDriverDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query("dni_driver") dni_driver: string, @Query("driver_name") driver_name: string,
    @Query("type_driver_situation") type_driver_situation: string, @Query("id_car") id_car: string) {
    return this.driverService.findAll(dni_driver, driver_name,
      type_driver_situation ? +type_driver_situation : undefined, id_car ? +id_car : undefined);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.driverService.findOneSerializable(+id);
  }

  @Get('getHistorialDriverSituations/:id')
  async getHistorialDriverSituations(@Param('id', ParseIntPipe) id: number, @Query('nombreTipoSituacion') nombreTipoSituacion: string) {
    return await this.driverService.getHistorialDriverSituations(id, nombreTipoSituacion)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    await this.driverService.update(+id, updateDriverDto);
    return { succes: true }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
