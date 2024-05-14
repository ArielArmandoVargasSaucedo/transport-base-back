import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDriverSituationDto } from './dto/create-type_driver_situation.dto';
import { UpdateTypeDriverSituationDto } from './dto/update-type_driver_situation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeDriverSituation } from './entities/type_driver_situation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeDriverSituationService {

  constructor(
    @InjectRepository(TypeDriverSituation)
    private readonly typesDriverSituationRepository:
    Repository<TypeDriverSituation>){
  }

  async create(createTypeDriverSituationDto: CreateTypeDriverSituationDto) {
    const typeDriverSituation = this.typesDriverSituationRepository.create(createTypeDriverSituationDto) 
    return await this.typesDriverSituationRepository.save(typeDriverSituation);
  }

  async findAll() {
    return await this.typesDriverSituationRepository.find();
  }

  async findOne(id_aut_type_ds: number) {
    return await this.typesDriverSituationRepository.findOne({where: {id_aut_type_ds}});
  }

  async update(id_aut_type_ds: number, updateTypeDriverSituationDto: UpdateTypeDriverSituationDto) {
    const typeDriverSituation = await this.findOne(id_aut_type_ds)
    if(!typeDriverSituation)
      throw new NotFoundException
    Object.assign(typeDriverSituation, updateTypeDriverSituationDto)
    return await this.typesDriverSituationRepository.save(typeDriverSituation);
  }

  async remove(id_aut_type_ds: number) {
    const typesDriverSituation = await this.findOne(id_aut_type_ds)
    if(typesDriverSituation)
      throw new NotFoundException
    return await this.typesDriverSituationRepository.delete(id_aut_type_ds);
  }
}
