import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query("car_number") car_number: string, @Query("car_brand") car_brand: string, @Query("number_of_seats") number_of_seats: string,
  @Query("type_car_situation") type_car_situation: string) {
    return await this.carService.findAll(car_number, car_brand, number_of_seats ? +number_of_seats: undefined,
      type_car_situation ? +type_car_situation:undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
     await this.carService.update(+id, updateCarDto);
     return {succes: true}
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.carService.remove(+id);
  }
}
