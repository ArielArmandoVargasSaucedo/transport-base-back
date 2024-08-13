import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgrammingTypeDto } from './dto/create-programming_type.dto';
import { UpdateProgrammingTypeDto } from './dto/update-programming_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgrammingType } from './entities/programming_type.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProgrammingTypeService {

  constructor(
    @InjectRepository(ProgrammingType)
    private readonly programmingTypesRepository:
    Repository<ProgrammingType>){
  }

  async create(createProgrammingTypeDto: CreateProgrammingTypeDto) {
    createProgrammingTypeDto.prog_type_name = createProgrammingTypeDto.prog_type_name.toLowerCase()
    const programmingType = this.programmingTypesRepository.create(createProgrammingTypeDto)
    return await this.programmingTypesRepository.save(programmingType);
  }

  async findAll(prog_type_name: string) {
    const progTypeNameList: Array<ProgrammingType> = await this.programmingTypesRepository.find({
      where:{
        prog_type_name: prog_type_name ? Like(`%${prog_type_name.toLowerCase()}%`) : prog_type_name
      },
    })
    return progTypeNameList;
  }

  async findOne(id_aut_prog_type: number) {
    return await this.programmingTypesRepository.findOne({where: {id_aut_prog_type}});
  }

  async update(id_aut_prog_type: number, updateProgrammingTypeDto: UpdateProgrammingTypeDto) {
    const programmingType = await this.findOne(id_aut_prog_type)
    if(!programmingType)
      throw new NotFoundException
    Object.assign(programmingType, updateProgrammingTypeDto)
    return await this.programmingTypesRepository.save(programmingType);
  }

  async remove(id_aut_prog_type: number) {
    const programmingType = await this.findOne(id_aut_prog_type)
    if(!programmingType)
      throw new NotFoundException
    return await this.programmingTypesRepository.delete(id_aut_prog_type);
  }
}
