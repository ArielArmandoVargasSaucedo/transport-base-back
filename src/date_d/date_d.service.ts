import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDateDDto } from './dto/create-date_d.dto';
import { UpdateDateDDto } from './dto/update-date_d.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DateD } from './entities/date_d.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DateDService {

  constructor(
    @InjectRepository(DateD)
    private readonly datesDRepository:
    Repository<DateD>){
  }

  async create(createDateDDto: CreateDateDDto) {
    const dateD = this.datesDRepository.create(createDateDDto)
    return await this.datesDRepository.save(dateD);
  }

  async findAll() {
    return await this.datesDRepository.find();
  }

  async findOne(id_aut_date: number) {
    return await this.datesDRepository.findOne({where: {id_aut_date}});
  }

  async update(id_aut_date: number, updateDateDDto: UpdateDateDDto) {
    const dateD = await this.findOne(id_aut_date)
    if(!dateD)
      throw new NotFoundException
    Object.assign(dateD, updateDateDDto)
    return await this.datesDRepository.save(dateD);
  }

  async remove(id_aut_date: number) {
    const dateD = await this.findOne(id_aut_date)
    if(!dateD)
      throw new NotFoundException
    return await this.datesDRepository.delete(id_aut_date);
  }
}
