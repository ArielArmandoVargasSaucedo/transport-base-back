import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      if (createCarDto.car_number.length != 7)
        throw new HttpException('El número del carro debe tener 7 caracteres', HttpStatus.BAD_REQUEST)
      if (!/^[^*_\[\]'"]+$/.test(createCarDto.car_number) || !/^[^0-9]+$/.test(createCarDto.car_number[0]) || !/^\d+$/.test(createCarDto.car_number.slice(-6)))
        throw new HttpException('El número del carro debe contener números en sus 6 últimos caracteres', HttpStatus.BAD_REQUEST)
      if (createCarDto.car_brand.length < 3)
        throw new HttpException('La marca del carro debe tener al menos 2 caracteres', HttpStatus.BAD_REQUEST)
      else if (!/^[^*_\[\]'"]+$/.test(createCarDto.car_brand) || !/^[^0-9]+$/.test(createCarDto.car_brand))
        throw new HttpException('La marca del carro solo debe tener letras', HttpStatus.BAD_REQUEST)

      // se envuelve esta transacción en una operación (***HACER***)
      createCarDto.car_number = createCarDto.car_number.toUpperCase()
      const car: Car = this.carsRepository.create(createCarDto)
      // se inserta del carro en la base de datos
      const carInsertado: Car = await this.carsRepository.save(car);
      //se le asigna el id autoincrementable generado del carro a la situación del carro, estableciento la relación de ambos
      const createCarSituationDto: CreateCarSituationDto = createCarDto.car_situation
      createCarSituationDto.id_car = carInsertado.id_car

      //se manda el servicio carSituation a insertar la situación del carro en la base de datos
      await this.carSituationService.create(createCarSituationDto)

      return carInsertado;
    } catch (error) {
      if (error.code == '23505') {
        if (error.detail.includes('car_number'))
          throw new HttpException('El número del carro ya existe.', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }

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

  async findOne(id_car: number): Promise<Car | undefined> {
    const car: Car | undefined = await this.carsRepository.findOne({
      where: { id_car },
      relations: ['carSituations']
    });

    return car
  }

  async findOneSerializable(id_car: number): Promise<CarSerializable> {
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
    try {
      if (updateCarDto.car_number.length != 7)
        throw new HttpException('El número del carro debe tener 7 caracteres', HttpStatus.BAD_REQUEST)
      if (!/^[^*_\[\]'"]+$/.test(updateCarDto.car_number) || !/^[^0-9]+$/.test(updateCarDto.car_number[0]) || !/^\d+$/.test(updateCarDto.car_number.slice(-6)))
        throw new HttpException('El número del carro debe contener números en sus 6 últimos caracteres', HttpStatus.BAD_REQUEST)
      if (updateCarDto.car_brand.length < 3)
        throw new HttpException('La marca del carro debe tener al menos 2 caracteres', HttpStatus.BAD_REQUEST)
      else if (!/^[^*_\[\]'"]+$/.test(updateCarDto.car_brand) || !/^[^0-9]+$/.test(updateCarDto.car_brand))
        throw new HttpException('La marca del carro solo debe tener letras', HttpStatus.BAD_REQUEST)

      const car = await this.findOne(id_car)
      if (!car)
        throw new NotFoundException
      updateCarDto.car_number = updateCarDto.car_number.toUpperCase()

      // Se actualiza la infomración del carro en la base de datos
      Object.assign(car, updateCarDto)
      await this.carsRepository.save(car);

      //Crear la situación del carro en caso de que se haya asignado un nuevo tipo de situación o se haya cambiado la fecha de retorno
      if (updateCarDto.car_situation.id_aut_type_cs !== car.carSituations[car.carSituations.length - 1].id_aut_type_cs ||
        updateCarDto.car_situation.return_date_cs !== car.carSituations[car.carSituations.length - 1].return_date_cs) {
        const createCarSituationDto: CreateCarSituationDto = updateCarDto.car_situation
        createCarSituationDto.id_car = id_car
        await this.carSituationService.create(createCarSituationDto)
      }


    } catch (error) {
      if (error.code == '23505') {
        if (error.detail.includes('car_number'))
          throw new HttpException('El número del carro ya existe.', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }

  }

  async remove(id_car: number) {
    const car = await this.findOne(id_car)
    if (!car)
      throw new NotFoundException
    return await this.carsRepository.delete(id_car);
  }
}
