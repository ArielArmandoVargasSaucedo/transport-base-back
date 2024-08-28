import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CarSituationService } from 'src/car_situation/car_situation.service';
import { CarSerializable } from './serializable/car.serializable';
import { CarSitutationSerializable } from 'src/car_situation/serializable/car-situation.serializable';
import { CreateCarSituationDto } from 'src/car_situation/dto/create-car_situation.dto';
import { TypeCarSituationSerializable } from 'src/type_car_situation/serializable/type-car-sisutation.serializable';

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
      // en principio no existe hisotrial, por tanto se crea un nuevo historial
      car.historyCarSituations = new Array<CarSitutationSerializable>()
      // se inserta del carro en la base de datos
      const carInsertado: Car = await this.carsRepository.save(car);
      // se le asigna el id insertado a la situación del carro
      const currentCarSituation = createCarDto.currentCarSituation
      currentCarSituation.id_car = carInsertado.id_car
      // se inserta la situación en la base de datos
      await this.carSituationService.create(currentCarSituation)


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
      relations: ['currentCarSituation'],
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
      if (!type_car_situation || car.currentCarSituation.id_aut_type_cs === type_car_situation) // se filtra por car situation
        listCarSerializable.push(new CarSerializable(car.id_car, car.car_number,
          car.car_brand, car.number_of_seats,
          await this.carSituationService.findOneSerializable(car.currentCarSituation.id_cs)))
    }

    return listCarSerializable;
  }

  async findOne(id_car: number): Promise<Car | undefined> {
    const car: Car | undefined = await this.carsRepository.findOne({
      where: { id_car },
      relations: ['currentCarSituation']
    });

    return car
  }

  async findOneSerializable(id_car: number): Promise<CarSerializable> {
    const car: Car | undefined = await this.carsRepository.findOne({
      where: { id_car },
      relations: ['currentCarSituation']
    });

    // si fue encontrado carro
    if (car)
      return new CarSerializable(car.id_car, car.car_number, car.car_brand, car.number_of_seats,
        await this.carSituationService.findOneSerializable(
          car.currentCarSituation.id_cs))
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




      //Crear la situación del carro en caso de que se haya asignado un nuevo tipo de situación o se haya cambiado la fecha de retorno
      if (updateCarDto.currentCarSituation.id_aut_type_cs !== car.currentCarSituation.id_aut_type_cs ||
        new Date(updateCarDto.currentCarSituation.return_date_cs).getTime() !== new Date(car.currentCarSituation.return_date_cs).getTime()) {


        //En caso de que el tipo de situación tenga fecha de retorno y esta sea mayor que la actual se edita la fecha de retorno
        if (car.currentCarSituation.return_date_cs) {
          // Para realizar la comparación entre las fechas, primero se convierten estas realemente a tipo "Date" de typescript
          const returnDateCurrentSituationAnterior = new Date(car.currentCarSituation.return_date_cs)
          if (returnDateCurrentSituationAnterior > new Date()) {
            console.log("Si me imprimo es que la comparación funciona")
            // se actualiza la current date anterior antes de añadirla la historial
            car.currentCarSituation.return_date_cs = new Date() // se indica que realmente finalizó hoy
          }
        }

        // luego la anterior current car situation se añade al historial de situaciones del carro
        // para ello se busca esa situación en el servicio de situaciones de carros
        car.historyCarSituations.push(await this.carSituationService.findOneSerializable(car.currentCarSituation.id_cs))
        // luego se elimina la situación actual anterior del carro de la tabla de sitauciones
        await this.carSituationService.remove(car.currentCarSituation.id_cs)

        const currentCarSituation: CreateCarSituationDto = updateCarDto.currentCarSituation // se obtiene la nueva current car situation
        currentCarSituation.id_car = id_car // se le asigna el id del carro a la car situation para q sea insertada correctamente
        // finalmente se inserta la sitaución en la base de datos como nueva situación actual del carro
        await this.carSituationService.create(currentCarSituation)
      }
      // se le asigna la infomración del updateCarDTO al carro a modificar
      Object.assign(car, updateCarDto)
      // Se actualiza la infomración del carro en la base de datos
      await this.carsRepository.save(car);

    } catch (error) {
      if (error.code == '23505') {
        if (error.detail.includes('car_number'))
          throw new HttpException('El número del carro ya existe.', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }

  }

  // Método para obtener el historial de situaciones de un carro en específico
  public async getHistorialCarSituations(id_car: number, /* filtros */ nombreTipoSituacion?: string): Promise<Array<CarSitutationSerializable>> {
    const listHistorialCarSituationsRetorno: Array<CarSitutationSerializable> = new Array<CarSitutationSerializable>()
    const car = await this.findOne(id_car) // se busca al carro con ese id
    // si fue encontrado un carro con ese id
    if (car) {
      // se obtiene el historial completo de situaciones de los carros
      const historialCarSitautions = car.historyCarSituations
      // se recorre esa lista para filtrar
      historialCarSitautions.forEach((carSituation) => {
        // si se cumple con los filtros
        if ((!nombreTipoSituacion || carSituation.type_car_situation.type_cs_name.includes(nombreTipoSituacion)))
          listHistorialCarSituationsRetorno.push(carSituation)
      })
    }
    else
      throw new HttpException('No fue encontrado carro con ese id.', HttpStatus.BAD_REQUEST);

    return listHistorialCarSituationsRetorno
  }


  async remove(id_car: number) {
    const car = await this.findOne(id_car)
    if (!car)
      throw new NotFoundException
    return await this.carsRepository.delete(id_car);
  }
}
