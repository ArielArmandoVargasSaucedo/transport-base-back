import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeCarSituationDto } from './dto/create-type_car_situation.dto';
import { UpdateTypeCarSituationDto } from './dto/update-type_car_situation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeCarSituation } from './entities/type_car_situation.entity';
import { Like, Repository } from 'typeorm';
import { TypeCarSituationSerializable } from './serializable/type-car-sisutation.serializable';

@Injectable()
export class TypeCarSituationService {

  constructor(
    @InjectRepository(TypeCarSituation)
    private readonly typesCarSituationRepository:
      Repository<TypeCarSituation>) {
  }

  async create(createTypeCarSituationDto: CreateTypeCarSituationDto) {
    createTypeCarSituationDto.type_cs_name = createTypeCarSituationDto.type_cs_name.toLowerCase()
    const typeCarSituation = this.typesCarSituationRepository.create(createTypeCarSituationDto)
    return await this.typesCarSituationRepository.save(typeCarSituation);
  }

  async findAll(type_cs_name?: string) {
    const typeCarSituationList: Array<TypeCarSituation> = await this.typesCarSituationRepository.find({
      where: {
        type_cs_name: type_cs_name ? Like(`%${type_cs_name.toLowerCase}%`) : type_cs_name
      },
    })
    return typeCarSituationList;
  }

  async findOne(id_aut_type_cs: number): Promise<TypeCarSituationSerializable> {
    const typeCarSituation: TypeCarSituation | undefined = await this.typesCarSituationRepository.findOne({ where: { id_aut_type_cs } });
    // si fue encontrado el tipo de situación
    if (typeCarSituation)
      return new TypeCarSituationSerializable(typeCarSituation.id_aut_type_cs, typeCarSituation.type_cs_name)
    else
      throw new BadRequestException("No se encontró el tipo de situación")
  }

  async update(id_aut_type_cs: number, updateTypeCarSituationDto: UpdateTypeCarSituationDto) {
    const typeCarSituation = await this.findOne(id_aut_type_cs)
    if (!typeCarSituation)
      throw new NotFoundException
    Object.assign(typeCarSituation, updateTypeCarSituationDto)
    return await this.typesCarSituationRepository.save(typeCarSituation);
  }

  async remove(id_aut_type_cs: number) {
    const typeCarSituation = await this.findOne(id_aut_type_cs)
    if (!typeCarSituation)
      throw new NotFoundException
    return await this.typesCarSituationRepository.delete(id_aut_type_cs);
  }
}
