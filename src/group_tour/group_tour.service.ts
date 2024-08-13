import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupTourDto } from './dto/create-group_tour.dto';
import { UpdateGroupTourDto } from './dto/update-group_tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupTour } from './entities/group_tour.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class GroupTourService {

  constructor(
    @InjectRepository(GroupTour)
    private readonly  groupsTourRepository:
    Repository<GroupTour>){
  }

  async create(createGroupTourDto: CreateGroupTourDto) {
    const groupTour = this.groupsTourRepository.create(createGroupTourDto)
    return await this.groupsTourRepository.save(groupTour);
  }

  async findAll(group_code?: number, country?: string, number_of_tourist?: number) {
    const groupTourList: Array<GroupTour> = await this.groupsTourRepository.find({
      where:{
        group_code,
        group_country: country ? Like(`%${country}%`) : country,
        number_of_tourist
      },
    })
    return groupTourList;
  }

  async findOne(id_group: number) {
    return await this.groupsTourRepository.findOne({where: {id_group}});
  }

  async update(id_group: number, updateGroupTourDto: UpdateGroupTourDto) {
    const groupTour = await this.findOne(id_group)
    if(!groupTour)
      throw new NotFoundException
    Object.assign(groupTour, updateGroupTourDto)
    return await this.groupsTourRepository.save(groupTour);
  }

  async remove(id_group: number) {
    const groupTour = await this.findOne(id_group)
    if(!groupTour)
      throw new NotFoundException
    return await this.groupsTourRepository.delete(id_group);
  }
}
