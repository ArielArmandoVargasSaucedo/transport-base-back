import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { DriverSituationService } from 'src/driver_situation/driver_situation.service';
import { CreateDriverSituationDto } from 'src/driver_situation/dto/create-driver_situation.dto';
import { DriverSerializable } from './serializable/driver.serializable';
import { CarService } from 'src/car/car.service';

@Injectable()
export class DriverService {

  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository:
      Repository<Driver>, private readonly driverSituationService: DriverSituationService,
    private readonly carSerive: CarService) {
  }

  async create(createDriverDto: CreateDriverDto) {
    // se envuelve esta operación en una transacción
    const driver = this.driversRepository.create(createDriverDto)
    // se inserta al driver en la base de datos
    const driverInsertado: Driver = await this.driversRepository.save(driver)
    // se obtiene la situación del driver a insertar
    const driverSituation: CreateDriverSituationDto = createDriverDto.driver_situation
    // se asigna el id del driver insertado a la situación del driver
    driverSituation.id_driver = driverInsertado.id_driver
    // se asigna la fecha del sistema
    driverSituation.current_date_ds = new Date()
    // se manda al servicio de situaciones de drivers a insertar la situación del driver en la base de datos
    this.driverSituationService.create(driverSituation)

    return driverInsertado
  }

  async findAll(dni_driver?: string, driver_name?: string, home_address?: string, is_copilot?: boolean, type_driver_situation?: number) {
    let driverList: Array<Driver> = await this.driversRepository.find({
      relations: ['driverSituations', 'car'],
      where: {
        dni_driver: dni_driver ? Like(`%${dni_driver}%`) : dni_driver,
        driver_name: driver_name ? Like(`%${driver_name}%`) : driver_name,
        home_address: home_address ? Like(`%${home_address}%`) : home_address,
        is_copilot
      },
    })

    // se crea la lista de retorno
    let listDriverSerializable: Array<DriverSerializable> = Array<DriverSerializable>()

    // se construyen cars serilizables por cada car entity
    for (let i = 0; i < driverList.length; i++) {
      const driver = driverList[i]
      if (!type_driver_situation || driver.driverSituations[driver.driverSituations.length - 1].id_aut_type_ds === type_driver_situation) // se filtra por car situation
        listDriverSerializable.push(new DriverSerializable(driver.id_driver, driver.dni_driver, driver.driver_name,
          driver.home_address, driver.is_copilot,
          await this.driverSituationService.findOne(
            driver.driverSituations[driver.driverSituations.length - 1].id_ds), await this.carSerive.findOne(driver.id_car)))
    }
    return listDriverSerializable;
  }

  async findOne(id_driver: number) {
    return await this.driversRepository.findOne({
      where: { id_driver },
      relations: ['driverSituations', 'car']
    });
  }

  async update(id_driver: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.findOne(id_driver)
    if (!driver)
      throw new NotFoundException
    Object.assign(driver, updateDriverDto)
    return await this.driversRepository.save(driver);
  }

  async remove(id_driver: number) {
    const driver = await this.findOne(id_driver)
    if (!driver)
      throw new NotFoundException
    return await this.driversRepository.remove(driver);
  }
}
