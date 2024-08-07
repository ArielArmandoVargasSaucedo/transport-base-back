import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private readonly carsRepository:
    Repository<Car>){
  }

  async create(createCarDto: CreateCarDto) {
    const car = this.carsRepository.create(createCarDto)
    return await this.carsRepository.save(car);
  }

  async findAll() {
    return await this.carsRepository.find({
      relations: ['car_situation']
    });
  }

  async findOne(id_car: number) {
    return await this.carsRepository.findOne({
      where: {id_car},
      relations: ['carSituation']
    });
  }

  async update(id_car: number, updateCarDto: UpdateCarDto) {
    const car = await this.findOne(id_car)
    if(!car)
      throw new NotFoundException
    Object.assign(car, updateCarDto)
    return await this.carsRepository.save(car);
  }

  async remove(id_car: number) {
    const car = await this.findOne(id_car)
    if(!car)
      throw new NotFoundException
    return await this.carsRepository.delete(id_car);
  }
}
