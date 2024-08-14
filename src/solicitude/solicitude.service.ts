import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitude } from './entities/solicitude.entity';
import { Like, Repository } from 'typeorm';

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

  async findAll(id_car?: number, id_aut_prog_type?: number, id_group?: number, dateD?: Date) {
    const solicitudeList: Array<Solicitude> = await this.solicitudesRepository.find({
      relations: ['car', 'programmingType', 'groupTour'],
      where:{
        id_car,
        id_aut_prog_type,
        id_group,
        dateD: dateD
      },
    });
    return solicitudeList;
  }

  async findOne(id_solicitude: number) {
    return await this.solicitudesRepository.findOne({
      where: {id_solicitude},
      relations: ['car', 'programmingType', 'groupTour']
    });
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
