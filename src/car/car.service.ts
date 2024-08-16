import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CarSituationService } from 'src/car_situation/car_situation.service';
import { CreateCarSituationDto } from 'src/car_situation/dto/create-car_situation.dto';
import { CarSerializable } from './serializable/car.serializable';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car)
    private readonly carsRepository:
      Repository<Car>, private readonly carSituationService: CarSituationService) {
  }

  async create(createCarDto: CreateCarDto) {
    // se envuelve esta transacción en una operación (***HACER***)

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
    let carList: Array<Car> = await this.carsRepository.find({
      relations: ['carSituations'],
      where: {
        car_number: car_number ? Like(`%${car_number.toUpperCase()}%`) : car_number,
        car_brand: car_brand ? Like(`%${car_brand.toLowerCase()}%`) : car_brand,
        number_of_seats,
      },
    })

    // se crea la lista de retorno
    let listCarSerializable: Array<CarSerializable> = Array<CarSerializable>()

    // se construyen cars serilizables por cada car entity
    for (let i = 0; i < carList.length; i++) {
      const car = carList[i]
      if (!type_car_situation || car.carSituations[car.carSituations.length - 1].id_aut_type_cs === type_car_situation) // se filtra por car situation
        listCarSerializable.push(new CarSerializable(car.id_car, car.car_number,
          car.car_brand, car.number_of_seats,
          await this.carSituationService.findOne(car.carSituations[car.carSituations.length - 1].id_cs)))
    }

    return listCarSerializable;
  }

  async findOne(id_car: number): Promise<CarSerializable> {
    const car: Car | undefined = await this.carsRepository.findOne({
      where: { id_car },
      relations: ['carSituations']
    });

    // si fue encontrado carro
    if (car)
      return new CarSerializable(car.id_car, car.car_number, car.car_brand, car.number_of_seats,
        await this.carSituationService.findOne(
          car.carSituations[car.carSituations.length - 1].id_cs))
    else
      throw new BadRequestException("No se enocntró el carro")
  }

  async update(id_car: number, updateCarDto: UpdateCarDto) {
    const car = await this.findOne(id_car)
    if (!car)
      throw new NotFoundException
    updateCarDto.car_number = updateCarDto.car_number.toUpperCase()
    Object.assign(car, updateCarDto)
    return await this.carsRepository.save(car);
  }

  async remove(id_car: number) {
    const car = await this.findOne(id_car)
    if (!car)
      throw new NotFoundException
    return await this.carsRepository.delete(id_car);
  }
}
