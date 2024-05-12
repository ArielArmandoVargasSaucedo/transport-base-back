import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarSituationDto } from './dto/create-car_situation.dto';
import { UpdateCarSituationDto } from './dto/update-car_situation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarSituation } from './entities/car_situation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarSituationService {

  constructor(
    @InjectRepository(CarSituation)
    private readonly carSituationsRepository:
    Repository<CarSituation>){
  }

  async create(createCarSituationDto: CreateCarSituationDto) {
    const carSituation = this.carSituationsRepository.create(createCarSituationDto)
    return await this.carSituationsRepository.save(carSituation);
  }

  async findAll() {
    return await this.carSituationsRepository.find();
  }

  async findOne(id_cs: number) {
    return await this.carSituationsRepository.findOne({where: {id_cs}});
  }

  async update(id_cs: number, updateCarSituationDto: UpdateCarSituationDto) {
    const carSituation = await this.findOne(id_cs)
    if(!carSituation)
      throw new NotFoundException
    Object.assign(carSituation, updateCarSituationDto)
    return await this.carSituationsRepository.save(carSituation);
  }

  async remove(id_cs: number) {
    const carSituation = await this.findOne(id_cs)
    if(!carSituation)
      throw new NotFoundException
    return await this.carSituationsRepository.delete(id_cs);
  }
}
