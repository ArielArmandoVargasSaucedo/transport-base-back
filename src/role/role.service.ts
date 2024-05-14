import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository:
    Repository<Role>){
  }

  async create(createRoleDto: CreateRoleDto) {
    const role = this.rolesRepository.create(createRoleDto)
    return await this.rolesRepository.save(role);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id_aut_role: number) {
    return await this.rolesRepository.findOne({where: {id_aut_role}});
  }

  async update(id_aut_role: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id_aut_role)
    if(!role)
      throw new NotFoundException
    Object.assign(role, updateRoleDto)
    return await this.rolesRepository.save(role);
  }

  async remove(id_aut_role: number) {
    const role = await this.findOne(id_aut_role)
    if(!role)
      throw new NotFoundException
    return await this.rolesRepository.delete(id_aut_role);
  }
}
