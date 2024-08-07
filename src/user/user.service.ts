import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository:
    Repository<User>){
    }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)
    
    //Encriptar contraseña
    const saltOrRounds = 10
    const hash = await bcrypt.hash(user.password_user, saltOrRounds)
    user.password_user = hash

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({
      relations: ['role', 'driver']
    });
  }

  async findOne(id_aut_user: number) {
    return await this.usersRepository.findOne({
      where: {id_aut_user},
      relations: ['role', 'driver']
    });
  }

  async update(id_aut_user: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id_aut_user)
    if(!user)
      throw new NotFoundException
    Object.assign(user, updateUserDto)

    //Encriptar contraseña
    const saltOrRounds = 10
    const hash = await bcrypt.hash(user.password_user, saltOrRounds)
    user.password_user = hash
    
    return await this.usersRepository.save(user);
  }

  async remove(id_aut_user: number) {
    const user = await this.findOne(id_aut_user)
    if(!user)
      throw new NotFoundException
    return await this.usersRepository.delete(id_aut_user);
  }
}
