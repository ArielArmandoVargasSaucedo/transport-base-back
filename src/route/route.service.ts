import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RouteService {

  constructor(
    @InjectRepository(Route)
    private readonly routesRepository:
    Repository<Route>){
  }

  async create(createRouteDto: CreateRouteDto) {
    const route = this.routesRepository.create(createRouteDto)
    return await this.routesRepository.save(route);
  }

  async findAll() {
    return await this.routesRepository.find();
  }

  async findOne(id_route: number) {
    return await this.routesRepository.findOne({where: {id_route}});
  }

  async update(id_route: number, updateRouteDto: UpdateRouteDto) {
    const route = await this.findOne(id_route)
    if(!route)
      throw new NotFoundException
    Object.assign(route, updateRouteDto)
    return await this.routesRepository.save(route);
  }

  async remove(id_route: number) {
    const route = await this.findOne(id_route)
    if(!route)
      throw new NotFoundException
    return await this.routesRepository.delete(id_route);
  }
}
