import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Repository } from 'typeorm';
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

  async findAll() {
    return await this.driversRepository.find({
      relations: ['driverSituation', 'car']
    });
  }

  async findOne(id_driver: number) {
    return await this.driversRepository.findOne({
      where: {id_driver},
      relations: ['driverSituation', 'car']
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
