import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDriverSituationDto } from './dto/create-type_driver_situation.dto';
import { UpdateTypeDriverSituationDto } from './dto/update-type_driver_situation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeDriverSituation } from './entities/type_driver_situation.entity';
import { Like, Repository } from 'typeorm';
import { TypeDriverSituationSerializable } from './serializable/type-driver-situation.serializable';

@Injectable()
export class TypeDriverSituationService {

  constructor(
    @InjectRepository(TypeDriverSituation)
    private readonly typesDriverSituationRepository:
      Repository<TypeDriverSituation>) {
  }

  async create(createTypeDriverSituationDto: CreateTypeDriverSituationDto) {
    createTypeDriverSituationDto.type_ds_name = createTypeDriverSituationDto.type_ds_name.toLowerCase()
    const typeDriverSituation = this.typesDriverSituationRepository.create(createTypeDriverSituationDto)
    return await this.typesDriverSituationRepository.save(typeDriverSituation);
  }

  async findAll(type_ds_name?: string) {
    const driverSituationList: Array<TypeDriverSituation> = await this.typesDriverSituationRepository.find({
      where: {
        type_ds_name: type_ds_name ? Like(`%${type_ds_name.toLowerCase()}%`) : type_ds_name
      },
    })
    return driverSituationList;
  }

  async findOne(id_aut_type_ds: number): Promise<TypeDriverSituationSerializable> {
    const typeDriverSituation: TypeDriverSituation | undefined = await this.typesDriverSituationRepository.findOne({ where: { id_aut_type_ds } });
    // si fue encontrada el tipo de situación del chofer
    if (typeDriverSituation)
      return new TypeDriverSituationSerializable(typeDriverSituation.id_aut_type_ds,
        typeDriverSituation.type_ds_name)
    else
      throw new BadRequestException("No se encontró el tipo de situación")
  }

  async update(id_aut_type_ds: number, updateTypeDriverSituationDto: UpdateTypeDriverSituationDto) {
    const typeDriverSituation = await this.findOne(id_aut_type_ds)
    if (!typeDriverSituation)
      throw new NotFoundException
    Object.assign(typeDriverSituation, updateTypeDriverSituationDto)
    return await this.typesDriverSituationRepository.save(typeDriverSituation);
  }

  async remove(id_aut_type_ds: number) {
    const typesDriverSituation = await this.findOne(id_aut_type_ds)
    if (!typesDriverSituation)
      throw new NotFoundException
    return await this.typesDriverSituationRepository.delete(id_aut_type_ds);
  }
}
