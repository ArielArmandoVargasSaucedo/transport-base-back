import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CarSituationService } from 'src/car_situation/car_situation.service';
import { CreateCarSituationDto } from 'src/car_situation/dto/create-car_situation.dto';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private readonly carsRepository:
    Repository<Car>, private readonly carSituationService: CarSituationService){
  }

  async create(createCarDto: CreateCarDto) {
    createCarDto.car_number = createCarDto.car_number.toUpperCase()
    
    const car: Car = this.carsRepository.create(createCarDto)
    // se inserta del carro en la base de datos
   const carInsertado: Car = await this.carsRepository.save(car);
    //se le asigna el id autoincrementable generado del carro a la situación del carro, estableciento la relación de ambos
    const createCarSituationDto: CreateCarSituationDto = createCarDto.car_situation

    createCarSituationDto.id_car = carInsertado.id_car
    // se le asigna la fecha actual
    createCarSituationDto.current_date_cs = new Date()
    //se manda el servicio carSituation a insertar la situación del carro en la base de datos
    this.carSituationService.create(createCarSituationDto)

    return carInsertado
  }

  async findAll(car_number?: string, car_brand?: string, number_of_seats?: number, type_car_situation?: number) {
    let carList: Array<Car> =  await this.carsRepository.find({
      relations: ['carSituations'],
      where:{
        car_number: car_number ? Like(`%${car_number.toUpperCase()}%`) : car_number,
        car_brand: car_brand ? Like(`%${car_brand.toLowerCase()}%`): car_brand,
        number_of_seats,
      },
    })

    //método para filtrar por la situación actual del carro
    if(type_car_situation){
      let list: Array<Car> = []
      for(let i = 0; i < carList.length; i++){
        if(carList[i].carSituations[carList[i].carSituations.length-1].id_aut_type_cs == type_car_situation)
          list.push(carList[i])
      }
      carList = list
    }
    return carList;
  }

  async findOne(id_car: number) {
    return await this.carsRepository.findOne({
      where: {id_car},
      relations: ['carSituations']
    });
  }

  async update(id_car: number, updateCarDto: UpdateCarDto) {
    const car = await this.findOne(id_car)
    if(!car)
      throw new NotFoundException
    updateCarDto.car_number = updateCarDto.car_number.toUpperCase()
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
