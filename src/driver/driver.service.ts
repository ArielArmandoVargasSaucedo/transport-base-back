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
import { DriverSituation } from 'src/driver_situation/entities/driver_situation.entity';
import { UpdateDriverSituationDto } from 'src/driver_situation/dto/update-driver_situation.dto';

@Injectable()
export class DriverService {

  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository:
      Repository<Driver>, private readonly driverSituationService: DriverSituationService,
    private readonly carSerive: CarService) {
  }

  async create(createDriverDto: CreateDriverDto) {
    try{
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
      const driverInsertado: Driver = await this.driversRepository.save(driver)// se inserta al driver en la base de datos
      const driverSituation: CreateDriverSituationDto = createDriverDto.driver_situation// se obtiene la situación del driver a insertar
      driverSituation.id_driver = driverInsertado.id_driver// se asigna el id del driver insertado a la situación del driver
      await this.driverSituationService.create(driverSituation)// se manda al servicio de situaciones de drivers a insertar la situación del driver

      return driverInsertado;
    }catch(error){
      if (error.code == '23505') {
        if(error.detail.includes('dni_driver'))
          throw new HttpException('El dni del chofer ya existe.', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  async findAll(dni_driver?: string, driver_name?: string, type_driver_situation?: number, id_car?: number) {
    let driverList: Array<Driver> = await this.driversRepository.find({
      relations: ['driverSituations', 'car'],
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
      if (!type_driver_situation || driver.driverSituations[driver.driverSituations.length - 1].id_aut_type_ds === type_driver_situation) // se filtra por driver situation
        listDriverSerializable.push(new DriverSerializable(driver.id_driver, driver.dni_driver, driver.driver_name,
          driver.home_address, driver.is_copilot,
          await this.driverSituationService.findOne(
            driver.driverSituations[driver.driverSituations.length - 1].id_ds), await this.carSerive.findOneSerializable(driver.id_car)))
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
        throw new HttpException('El chofer no existe en la base de datos', HttpStatus.BAD_REQUEST)
    try{
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

      // se actualiza la infomración del driver en la base de datos
      Object.assign(driver, updateDriverDto)
      driver.car = undefined // *****se descubrió la cura del cancer****** (posdata: por segunda vez)
      await this.driversRepository.save(driver);
      
      //Crear la situación del chofer en caso de que se haya asignado un nuevo tipo de situación o se haya cambiado la fecha de retorno
      if(updateDriverDto.driver_situation.id_aut_type_ds !== driver.driverSituations[driver.driverSituations.length-1].id_aut_type_ds || 
        updateDriverDto.driver_situation.return_date_ds !== driver.driverSituations[driver.driverSituations.length-1].return_date_ds){

          //En caso de que el tipo de situación tenga fecha de retorno y esta sea mayor que la actual se edita la fecha de retorno
          if(driver.driverSituations[driver.driverSituations.length-1].return_date_ds && driver.driverSituations[driver.driverSituations.length-1].return_date_ds > new Date()){
            driver.driverSituations[driver.driverSituations.length-1].return_date_ds = new Date()
            await this.driverSituationService.update(driver.driverSituations[driver.driverSituations.length-1].id_ds, driver.driverSituations[driver.driverSituations.length-1])
          }

          const driverSituation: CreateDriverSituationDto = updateDriverDto.driver_situation
          driverSituation.id_driver = id_driver
          await this.driverSituationService.create(driverSituation)
      }
      
    } catch(error) {
      if (error.code == '23505') {
        if(error.detail.includes('dni_driver'))
          throw new HttpException('El dni del chofer ya existe.', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  async remove(id_driver: number) {
    const driver = await this.findOne(id_driver)
    if (!driver)
      throw new NotFoundException
    return await this.driversRepository.remove(driver);
  }
}
