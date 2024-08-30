import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitude } from './entities/solicitude.entity';
import { Repository } from 'typeorm';
import { RouteService } from 'src/route/route.service';
import { GroupTourService } from 'src/group_tour/group_tour.service';

@Injectable()
export class SolicitudeService {

  constructor(
    @InjectRepository(Solicitude)
    private readonly solicitudesRepository:
    Repository<Solicitude>,
  private routeService: RouteService,
private groupService: GroupTourService){
  }

  async create(createSolicitudeDto: CreateSolicitudeDto) {
    const solicitude = this.solicitudesRepository.create(createSolicitudeDto)
    console.log(createSolicitudeDto.group)
      // se inserta el grupo solo si fue mandado uno
      if (createSolicitudeDto.group) {
        // se inserta al grupo para obtener su identificador
        const groupInsertado = await this.groupService.create(createSolicitudeDto.group)
        // se le asigna a la solicitud a insertar dicho identificador del group insertado
        
        solicitude.id_group = groupInsertado.id_group
       }
       // de forma contraria ya va a tener asignado dicho id de un grupo ya existente

    const solicitudInsertada = await this.solicitudesRepository.save(solicitude);
    // luego de insertar la solicitud se insertan sus relaciones
    // para ello:
    
    // se marca a la ruta, como parte de esta solicitud
    const route = createSolicitudeDto.routeDTO
    route.id_solicitude = solicitudInsertada.id_solicitude
    // se manda al servicio de route service a ejecutar la operación
    await this.routeService.create(route)
  
  }

  async findAll(id_car?: number, id_aut_prog_type?: number, id_group?: number, id_driver?: number , dateD?: Date) {
    const solicitudeList: Array<Solicitude> = await this.solicitudesRepository.find({
      relations: ['car', 'programmingType', 'groupTour','route', 'driver'],
        where:{
        id_car,
        id_aut_prog_type,
        id_group,
        id_driver: id_driver,
        dateD: dateD
      },
    });
    return solicitudeList;
  }

  async findOne(id_solicitude: number) {
    return await this.solicitudesRepository.findOne({
      where: {id_solicitude},
      relations: ['car', 'programmingType', 'groupTour','route', 'driver']
    });
  }

  async update(id_solicitude: number, updateSolicitudeDto: UpdateSolicitudeDto) {
    const solicitude = await this.findOne(id_solicitude)
    if(!solicitude)
      throw new NotFoundException
    // se modifica que la ruta
    await this.routeService.update(solicitude.route.id_route, updateSolicitudeDto.route )
    
    Object.assign(solicitude, updateSolicitudeDto)
    solicitude.programmingType = undefined
    solicitude.car = undefined
    return await this.solicitudesRepository.save(solicitude);
  }

  async remove(id_solicitude: number) {
    const solicitude = await this.findOne(id_solicitude)
    if(!solicitude)
      throw new NotFoundException
    return await this.solicitudesRepository.delete(id_solicitude);
  }
}
