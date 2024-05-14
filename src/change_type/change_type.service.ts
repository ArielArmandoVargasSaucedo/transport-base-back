import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChangeTypeDto } from './dto/create-change_type.dto';
import { UpdateChangeTypeDto } from './dto/update-change_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeType } from './entities/change_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChangeTypeService {

  constructor(
    @InjectRepository(ChangeType)
    private readonly changeTypesRepository:
    Repository<ChangeType>){
  }

  async create(createChangeTypeDto: CreateChangeTypeDto) {
    const changeType = this.changeTypesRepository.create(createChangeTypeDto)
    return await this.changeTypesRepository.save(changeType);
  }

  async findAll() {
    return await this.changeTypesRepository.find();
  }

  async findOne(id_aut_change_type: number) {
    return await this.changeTypesRepository.findOne({where: {id_aut_change_type}});
  }

  async update(id_aut_change_type: number, updateChangeTypeDto: UpdateChangeTypeDto) {
    const changeType = await this.findOne(id_aut_change_type)
    if(!changeType)
      throw new NotFoundException
    Object.assign(changeType, updateChangeTypeDto)
    return await this.changeTypesRepository.save(changeType);
  }

  async remove(id_aut_change_type: number) {
    const changeType = await this.findOne(id_aut_change_type)
    if(!changeType)
      throw new NotFoundException
    return await this.changeTypesRepository.delete(id_aut_change_type);
  }
}
