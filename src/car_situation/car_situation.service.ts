import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarSituationDto } from './dto/create-car_situation.dto';
import { UpdateCarSituationDto } from './dto/update-car_situation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarSituation } from './entities/car_situation.entity';
import { Repository } from 'typeorm';
import { CarSitutationSerializable } from './serializable/car-situation.serializable';
import { TypeCarSituationService } from 'src/type_car_situation/type_car_situation.service';

@Injectable()
export class CarSituationService {

  constructor(
    @InjectRepository(CarSituation)
    private readonly carSituationsRepository:
      Repository<CarSituation>,
    private readonly typeCarSituationService: TypeCarSituationService) {
  }

  async create(createCarSituationDto: CreateCarSituationDto) {
    const carSituation = this.carSituationsRepository.create(createCarSituationDto)
    return await this.carSituationsRepository.save(carSituation);
  }

  async findAll() {
    return await this.carSituationsRepository.find({
      relations: ['typeCarSituation']
    });
  }

  async findOne(id_cs: number) {
    const carSituation: CarSituation | undefined = await this.carSituationsRepository.findOne({
      where: { id_cs },
      relations: ['typeCarSituation']
    });

    // si fue encontrada una carSituation
    if (carSituation)
      return new CarSitutationSerializable(carSituation.id_cs, carSituation.return_date_cs,
        carSituation.current_date_cs,
        await this.typeCarSituationService.findOne(carSituation.id_aut_type_cs))
    else
      throw new BadRequestException("No se encontró el tipo de situación")
  }

  async update(id_cs: number, updateCarSituationDto: UpdateCarSituationDto) {
    const carSituation = await this.findOne(id_cs)
    if (!carSituation)
      throw new NotFoundException
    Object.assign(carSituation, updateCarSituationDto)
    return await this.carSituationsRepository.save(carSituation);
  }

  async remove(id_cs: number) {
    const carSituation = await this.findOne(id_cs)
    if (!carSituation)
      throw new NotFoundException
    return await this.carSituationsRepository.delete(id_cs);
  }
}
