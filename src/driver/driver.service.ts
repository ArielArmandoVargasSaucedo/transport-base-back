import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { DriverSituationService } from 'src/driver_situation/driver_situation.service';
import { CreateDriverSituationDto } from 'src/driver_situation/dto/create-driver_situation.dto';
import { DriverSerializable } from './serializable/driver.serializable';
import { CarService } from 'src/car/car.service';
import { DriverSituationSerializable } from 'src/driver_situation/serializable/driver-situation.serializable';

@Injectable()
export class DriverService {

  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository:
      Repository<Driver>, private readonly driverSituationService: DriverSituationService,
    private readonly carSerive: CarService) {
  }

  async create(createDriverDto: CreateDriverDto) {
    try {
      if (createDriverDto.dni_driver.length !== 11)
        throw new HttpException('El dni del chofer debe tener 11 caracteres', HttpStatus.BAD_REQUEST)
      else if (!/^\d+$/.test(createDriverDto.dni_driver) || !/^[^*_\[\]'"]+$/.test(createDriverDto.dni_driver))
        throw new HttpException('El dni del chofer debe contener solo números', HttpStatus.BAD_REQUEST)
      else if (createDriverDto.driver_name.length < 3)
        throw new HttpException('El nombre del chofer debe tener al menos 3 caracteres', HttpStatus.BAD_REQUEST)
      else if (!/^[^0-9]+$/.test(createDriverDto.driver_name) || !/^[^*_\[\]'"]+$/.test(createDriverDto.driver_name))
        throw new HttpException('El nombre del chofer solo debe contener letras', HttpStatus.BAD_REQUEST)
      else if (createDriverDto.home_address.length < 3)
        throw new HttpException('La dirección del chofer debe tener al menos 3 caracteres', HttpStatus.BAD_REQUEST)

      const driver = this.driversRepository.create(createDriverDto)// se envuelve esta operación en una transacción
      // en principio durante la creación no se tienen un historial de situaciones por tanto se inicializa la lista como vacía
      driver.historyDriverSituations = new Array<DriverSituationSerializable>()
      const driverInsertado: Driver = await this.driversRepository.save(driver)// se inserta al driver en la base de datos
      const currentDriverSituation: CreateDriverSituationDto = createDriverDto.currentDriverSituation// se obtiene la situación del driver a insertar
      currentDriverSituation.id_driver = driverInsertado.id_driver// se asigna el id del driver insertado a la situación del driver
      await this.driverSituationService.create(currentDriverSituation)// se manda al servicio de situaciones de drivers a insertar la situación del driver

      return driverInsertado;
    } catch (error) {
      if (error.code == '23505') {
        if (error.detail.includes('dni_driver'))
          throw new HttpException('El dni del chofer ya existe.', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  async findAll(dni_driver?: string, driver_name?: string, type_driver_situation?: number, id_car?: number) {
    let driverList: Array<Driver> = await this.driversRepository.find({
      relations: ['currentDriverSituation', 'car'],
      where: {
        dni_driver: dni_driver ? Like(`%${dni_driver}%`) : dni_driver,
        driver_name: driver_name ? Like(`%${driver_name}%`) : driver_name,
        id_car: id_car
      },
    })


    // se crea la lista de retorno
    let listDriverSerializable: Array<DriverSerializable> = Array<DriverSerializable>()

    // se construyen cars serilizables por cada car entity
    for (let i = 0; i < driverList.length; i++) {
      const driver = driverList[i]
      if (!type_driver_situation || driver.currentDriverSituation.id_aut_type_ds === type_driver_situation) // se filtra por driver situation
        listDriverSerializable.push(new DriverSerializable(driver.id_driver, driver.dni_driver, driver.driver_name,
          driver.home_address, driver.is_copilot,
          await this.driverSituationService.findOneSerializable(
            driver.currentDriverSituation.id_ds), await this.carSerive.findOneSerializable(driver.id_car)))
    }

    return listDriverSerializable;
  }

  // Método para obtener todos los drivers que aún no posean cuenta
  async getAllDriversWithOutAccount (): Promise<Array<DriverSerializable>> {
const driversSerializables: Array<DriverSerializable> = new Array<DriverSerializable>()

// se obtienen todos los drivers de la base de datos
const driversEntitys: Array<Driver> = await this.driversRepository.find({
  relations: ['user']
})


// se filtra la lista, para obtener a los drivers que no posean cuenta
driversEntitys.forEach((driver) => { 
  // si la propiedad user no está definida (no tiene cuenta)

  if (!driver.user)
    driversSerializables.push(new DriverSerializable(driver.id_driver, driver.dni_driver, 
  driver.driver_name, driver.home_address, driver.is_copilot)) // se inserta el driver en la lista de retorno
} )
return driversSerializables
  }

  async findOne(id_driver: number) {
    return await this.driversRepository.findOne({
      where: { id_driver },
      relations: ['currentDriverSituation', 'car']
    });
  }

  async findOneSerializable(id_driver: number) {
    const driver = await this.driversRepository.findOne({
      where: { id_driver },
      relations: ['currentDriverSituation', 'car']
    });

    // si fue encontrado el driver
    if (driver) {
      return new DriverSerializable(driver.id_driver, driver.dni_driver, driver.driver_name, driver.home_address, driver.is_copilot,
        await this.driverSituationService.findOneSerializable(driver.currentDriverSituation.id_ds), await this.carSerive.findOneSerializable(driver.id_car))
    }
    else
      throw new HttpException('No existe un driver con ese id.', HttpStatus.BAD_REQUEST)
  }

  async update(id_driver: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.findOne(id_driver)
    if (!driver)
      throw new HttpException('El chofer no existe en la base de datos', HttpStatus.BAD_REQUEST)
    try {
      if (updateDriverDto.dni_driver.length !== 11)
        throw new HttpException('El dni del chofer debe tener 11 caracteres', HttpStatus.BAD_REQUEST)
      else if (!/^\d+$/.test(updateDriverDto.dni_driver) || !/^[^*_\[\]'"]+$/.test(updateDriverDto.dni_driver))
        throw new HttpException('El dni del chofer debe contener solo números', HttpStatus.BAD_REQUEST)
      else if (updateDriverDto.driver_name.length < 3)
        throw new HttpException('El nombre del chofer debe tener al menos 3 caracteres', HttpStatus.BAD_REQUEST)
      else if (!/^[^0-9]+$/.test(updateDriverDto.driver_name) || !/^[^*_\[\]'"]+$/.test(updateDriverDto.driver_name))
        throw new HttpException('El nombre del chofer solo debe contener letras', HttpStatus.BAD_REQUEST)
      else if (updateDriverDto.home_address.length < 3)
        throw new HttpException('La dirección del chofer debe tener al menos 3 caracteres', HttpStatus.BAD_REQUEST)



      //Crear la situación del chofer en caso de que se haya asignado un nuevo tipo de situación o se haya cambiado la fecha de retorno
      if (updateDriverDto.currentDriverSituation.id_aut_type_ds !== driver.currentDriverSituation.id_aut_type_ds ||
        new Date(updateDriverDto.currentDriverSituation.return_date_ds).getTime() !== new Date(driver.currentDriverSituation.return_date_ds).getTime()) {

        //En caso de que el tipo de situación tenga fecha de retorno y esta sea mayor que la actual se edita la fecha de retorno
        if (driver.currentDriverSituation.return_date_ds) {
          // Para realizar la comparación entre las fechas, primero se convierten estas realemente a tipo "Date" de typescript
          const returnDateCurrentSituationAnterior = new Date(driver.currentDriverSituation.return_date_ds)
          if (returnDateCurrentSituationAnterior > new Date()) {
            console.log("Si me imprimo es que la comparación funciona")
            // se actualiza la current date anterior antes de añadirla la historial
            driver.currentDriverSituation.return_date_ds = new Date() // se indica que realmente finalizó hoy
          }
        }

        // se añade al hisotrial la situación actual anterior del driver
        // para ello se busca en el servicio de situaciones a dicha situación
        driver.historyDriverSituations.push(await this.driverSituationService.findOneSerializable(driver.currentDriverSituation.id_ds))
        // luego se elimina la situación actual anterior de la tabla de situaciones
        await this.driverSituationService.remove(driver.currentDriverSituation.id_ds)
        const currentDriverSituation: CreateDriverSituationDto = updateDriverDto.currentDriverSituation // se obtiene la nueva sitaución actual

        // se asigna el id del driver al que va a pertenecer
        currentDriverSituation.id_driver = id_driver
        // finalmente se inserta la nueva situación actual en la base de datos
        await this.driverSituationService.create(currentDriverSituation)
      }

      // se actualiza la infomración del driver en la base de datos
      Object.assign(driver, updateDriverDto)
      driver.car = undefined // *****se descubrió la cura del cancer****** (posdata: por segunda vez)
      await this.driversRepository.save(driver);

    } catch (error) {
      if (error.code == '23505') {
        if (error.detail.includes('dni_driver'))
          throw new HttpException('El dni del chofer ya existe.', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  // Método para obtener el historial de situaciones de un chofer en específico
  public async getHistorialDriverSituations(id_driver: number, /* filtros */ nombreTipoSituacion?: string): Promise<Array<DriverSituationSerializable>> {
    const listHistorialDriverSituations: Array<DriverSituationSerializable> = new Array<DriverSituationSerializable>()
    const driver = await this.findOne(id_driver) // se busca al carro con ese id
    // si fue encontrado un driver con ese id
    if (driver) {
      // se obtiene el historial completo de situaciones de los carros
      const historialDriverSituations = driver.historyDriverSituations
      // se recorre esa lista para filtrar
      historialDriverSituations.forEach((driverSituation) => {
        // si se cumple con los filtros
        if ((!nombreTipoSituacion || driverSituation.type_driver_situation.type_ds_name.includes(nombreTipoSituacion)))
          listHistorialDriverSituations.push(driverSituation)
      })
    }
    else
      throw new HttpException('No fue encontrado chófer con ese id.', HttpStatus.BAD_REQUEST);

    return listHistorialDriverSituations
  }

  async remove(id_driver: number) {
    const driver = await this.findOne(id_driver)
    if (!driver)
      throw new NotFoundException
    return await this.driversRepository.remove(driver);
  }
}
