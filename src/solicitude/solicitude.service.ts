import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitude } from './entities/solicitude.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolicitudeService {

  constructor(
    @InjectRepository(Solicitude)
    private readonly solicitudesRepository:
    Repository<Solicitude>){
  }

  async create(createSolicitudeDto: CreateSolicitudeDto) {
    const solicitude = this.solicitudesRepository.create(createSolicitudeDto)
    return await this.solicitudesRepository.save(solicitude);
  }

  async findAll() {
    return await this.solicitudesRepository.find();
  }

  async findOne(id_solicitude: number) {
    return await this.solicitudesRepository.findOne({where: {id_solicitude}});
  }

  async update(id_solicitude: number, updateSolicitudeDto: UpdateSolicitudeDto) {
    const solicitude = await this.findOne(id_solicitude)
    if(!solicitude)
      throw new NotFoundException
    Object.assign(solicitude, updateSolicitudeDto)
    return await this.solicitudesRepository.save(solicitude);
  }

  async remove(id_solicitude: number) {
    const solicitude = await this.findOne(id_solicitude)
    if(!solicitude)
      throw new NotFoundException
    return await this.solicitudesRepository.delete(id_solicitude);
  }
}
