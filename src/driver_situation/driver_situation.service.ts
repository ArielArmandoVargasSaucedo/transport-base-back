import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverSituationDto } from './dto/create-driver_situation.dto';
import { UpdateDriverSituationDto } from './dto/update-driver_situation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverSituation } from './entities/driver_situation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverSituationService {

  constructor(
    @InjectRepository(DriverSituation)
    private readonly driverSituationsRepository:
    Repository<DriverSituation>){
  }

  async create(createDriverSituationDto: CreateDriverSituationDto) {
    const driverSituation = this.driverSituationsRepository.create(createDriverSituationDto)
    return await this.driverSituationsRepository.save(driverSituation);
  }

  async findAll() {
    return await this.driverSituationsRepository.find({
      relations: ['type_driver_situation']
    });
  }

  async findOne(id_ds: number) {
    return await this.driverSituationsRepository.findOne({
      where: {id_ds},
      relations: ['type_driver_situation']
    });
  }

  async update(id_ds: number, updateDriverSituationDto: UpdateDriverSituationDto) {
    const driverSituation = await this.findOne(id_ds)
    if(!driverSituation)
      throw new NotFoundException
    Object.assign(driverSituation, updateDriverSituationDto)
    return await this.driverSituationsRepository.save(driverSituation);
  }

  async remove(id_ds: number) {
    const driverSituation = await this.findOne(id_ds)
    if(!driverSituation)
      throw new NotFoundException
    return await this.driverSituationsRepository.delete(id_ds);
  }
}
