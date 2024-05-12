import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeCarSituationDto } from './dto/create-type_car_situation.dto';
import { UpdateTypeCarSituationDto } from './dto/update-type_car_situation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeCarSituation } from './entities/type_car_situation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeCarSituationService {

  constructor(
    @InjectRepository(TypeCarSituation)
    private readonly typesCarSituationRepository:
    Repository<TypeCarSituation>){
  }

  async create(createTypeCarSituationDto: CreateTypeCarSituationDto) {
    const typeCarSituation = this.typesCarSituationRepository.create(createTypeCarSituationDto);
    return await this.typesCarSituationRepository.save(typeCarSituation);
  }

  async findAll() {
    return await this.typesCarSituationRepository.find();
  }

  async findOne(id_type_cs: number) {
    return await this.typesCarSituationRepository.findOne({where: {id_type_cs}});
  }

  async update(id_type_cs: number, updateTypeCarSituationDto: UpdateTypeCarSituationDto) {
    const typeCarSituation = await this.findOne(id_type_cs)
    if(!typeCarSituation)
      throw new NotFoundException
    Object.assign(typeCarSituation, updateTypeCarSituationDto)
    return await this.typesCarSituationRepository.save(typeCarSituation);
  }

  async remove(id_type_cs: number) {
    const typeCarSituation = await this.findOne(id_type_cs)
    if(!typeCarSituation)
      throw new NotFoundException
    return await this.typesCarSituationRepository.delete(id_type_cs);
  }
}
