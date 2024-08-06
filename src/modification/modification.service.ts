import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModificationDto } from './dto/create-modification.dto';
import { UpdateModificationDto } from './dto/update-modification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modification } from './entities/modification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModificationService {

  constructor(
    @InjectRepository(Modification)
    private readonly modificationsRepository:
    Repository<Modification>){
  }

  async create(createModificationDto: CreateModificationDto) {
    const modification = this.modificationsRepository.create(createModificationDto)
    return await this.modificationsRepository.save(modification);
  }

  async findAll() {
    return await this.modificationsRepository.find({
      relations: ['solicitude']
    });
  }

  async findOne(id_modification: number) {
    return await this.modificationsRepository.findOne({
      where: {id_modification},
      relations: ['solicitude']
    });
  }

  async update(id_modification: number, updateModificationDto: UpdateModificationDto) {
    const modification = await this.findOne(id_modification)
    if(!modification)
      throw new NotFoundException
    Object.assign(modification, updateModificationDto)
    return await this.modificationsRepository.save(modification);
  }

  async remove(id_modification: number) {
    const modification = await this.findOne(id_modification)
    if(!modification)
      throw new NotFoundException
    return await this.modificationsRepository.delete(id_modification);
  }
}
