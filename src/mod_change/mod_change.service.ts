import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModChangeDto } from './dto/create-mod_change.dto';
import { UpdateModChangeDto } from './dto/update-mod_change.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ModChange } from './entities/mod_change.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModChangeService {

  constructor(
    @InjectRepository(ModChange)
    private readonly modChangesRepository:
    Repository<ModChange>){
  }

  async create(createModChangeDto: CreateModChangeDto) {
    const modChange = this.modChangesRepository.create(createModChangeDto)
    return await this.modChangesRepository.save(modChange);
  }

  async findAll() {
    return await this.modChangesRepository.find({
      relations: ['change_type', 'modification']
    });
  }

  async findOne(id_mod_change: number) {
    return await this.modChangesRepository.findOne({
      where: {id_mod_change},
      relations: ['change_type', 'modification']
    });
  }

  async update(id_mod_change: number, updateModChangeDto: UpdateModChangeDto) {
    const modChange = await this.findOne(id_mod_change)
    if(!modChange)
      throw new NotFoundException
    Object.assign(modChange, updateModChangeDto)
    return await this.modChangesRepository.save(modChange);
  }

  async remove(id_mod_change: number) {
    const modChange = await this.findOne(id_mod_change)
    if(!modChange)
      throw new NotFoundException
    return await this.modChangesRepository.delete(id_mod_change);
  }
}
