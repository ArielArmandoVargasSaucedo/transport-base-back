import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverSituationDto } from './dto/create-driver_situation.dto';
import { UpdateDriverSituationDto } from './dto/update-driver_situation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverSituation } from './entities/driver_situation.entity';
import { Repository } from 'typeorm';
import { DriverSituationSerializable } from './serializable/driver-situation.serializable';
import { TypeDriverSituationService } from 'src/type_driver_situation/type_driver_situation.service';

@Injectable()
export class DriverSituationService {

  constructor(
    @InjectRepository(DriverSituation)
    private readonly driverSituationsRepository:
      Repository<DriverSituation>,
    private readonly typeDriverSituationService: TypeDriverSituationService) {
  }

  async create(createDriverSituationDto: CreateDriverSituationDto) {
    // se asigna la fecha del sistema
    createDriverSituationDto.current_date_ds = new Date()
    
    const driverSituation = this.driverSituationsRepository.create(createDriverSituationDto)
    
    return await this.driverSituationsRepository.save(driverSituation);
  }

  async findAll(id_driver?: number, id_aut_type_ds?: number, date?: Date) {
    let driverSituationList: Array<DriverSituation> = await this.driverSituationsRepository.find({
      relations: ['typeDriverSituation'],
      where:{
        id_driver,
        id_aut_type_ds
      }
    })

    //Filtrado por fecha
    if (date){
      let list: Array<DriverSituation> = []
      for (let i = 0; i < driverSituationList.length; i++){
        if (driverSituationList[i].current_date_ds >= date && driverSituationList[i].return_date_ds <= date)
          list.push(driverSituationList[i])
      }
      driverSituationList = list
    }

    return driverSituationList;
  }

  async findOne(id_ds: number): Promise<DriverSituationSerializable> {
    const driverSituation: DriverSituation | undefined = await this.driverSituationsRepository.findOne({
      where: { id_ds },
      relations: ['typeDriverSituation']
    });
    // si fue encontrada la situación del chofer
    if (driverSituation)
      return new DriverSituationSerializable(driverSituation.id_ds, driverSituation.id_driver,
        driverSituation.return_date_ds, driverSituation.current_date_ds, await this.typeDriverSituationService.findOne(driverSituation.id_aut_type_ds))
    else
      throw new BadRequestException("No se encontró la situación")
  }

  async update(id_ds: number, updateDriverSituationDto: UpdateDriverSituationDto) {
    const driverSituation = await this.findOne(id_ds)
    if (!driverSituation)
      throw new NotFoundException
    Object.assign(driverSituation, updateDriverSituationDto)
    return await this.driverSituationsRepository.save(driverSituation);
  }

  async remove(id_ds: number) {
    const driverSituation = await this.findOne(id_ds)
    if (!driverSituation)
      throw new NotFoundException
    return await this.driverSituationsRepository.delete(id_ds);
  }
}
