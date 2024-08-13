import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private readonly carsRepository:
    Repository<Car>){
  }

  async create(createCarDto: CreateCarDto) {
    createCarDto.car_number = createCarDto.car_brand.toUpperCase()
    const car = this.carsRepository.create(createCarDto)
    return await this.carsRepository.save(car);
  }

  async findAll(car_number?: string, car_brand?: string, number_of_seats?: number, type_car_situation?: number) {
    const carList: Array<Car> =  await this.carsRepository.find({
      relations: ['carSituation'],
      where:{
        car_number: car_number ? Like(`%${car_number.toUpperCase()}%`) : car_number,
        car_brand: car_brand ? Like(`%${car_brand.toLowerCase()}%`): car_brand,
        number_of_seats,
        carSituation:{
          id_aut_type_cs: type_car_situation
        },
      },
    });
    return carList;
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
