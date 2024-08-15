import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {

  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository:
    Repository<Driver>) { 
  }

  async create(createDriverDto: CreateDriverDto) {
    const driver = this.driversRepository.create(createDriverDto)
    return await this.driversRepository.save(driver);
  }

  async findAll(dni_driver?: string, driver_name?: string, home_address?: string, category?: string, is_copilot?: boolean, type_driver_situation?: number) {
    let driverList: Array<Driver> = await this.driversRepository.find({
      relations: ['driverSituations', 'car'],
      where:{
        dni_driver: dni_driver ? Like(`%${dni_driver}%`) : dni_driver,
        driver_name: driver_name ? Like(`%${driver_name}%`) : driver_name,
        home_address: home_address ? Like(`%${home_address}%`) : home_address,
        category: category ? Like(`%${category}%`) : category,
        is_copilot
      },
    })

    //método para filtrar por la situación actual del chofer
    if(type_driver_situation){
      let list: Array<Driver> = []
      for(let i = 0; i < driverList.length; i++){
        if(driverList[i].driverSituations[driverList[i].driverSituations.length-1].id_aut_type_ds == type_driver_situation)
          list.push(driverList[i])
      }
      driverList = list
    }
    return driverList;
  }

  async findOne(id_driver: number) {
    return await this.driversRepository.findOne({
      where: {id_driver},
      relations: ['driverSituations', 'car']
    });
  }

  async update(id_driver: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.findOne(id_driver)
    if(!driver)
      throw new NotFoundException
    Object.assign(driver, updateDriverDto)
    return await this.driversRepository.save(driver);
  }

  async remove(id_driver: number) {
    const driver = await this.findOne(id_driver)
    if(!driver)
      throw new NotFoundException
    return await this.driversRepository.remove(driver);
  }
}
