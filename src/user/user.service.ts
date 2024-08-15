import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

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

  async findAll(user_name?: string, dni_user?: string, id_aut_role?: number) {
    const userList: Array<User> = await this.usersRepository.find({
      relations: ['role', 'driver'],
      where:{
        user_name: user_name ? Like(`%${user_name}%`) : user_name,
        dni_user: dni_user ? Like(`%${dni_user}%`) : dni_user,
        id_aut_role
      },
    })
    return userList;
  }

  async findOne(id_aut_user: number) {
    return await this.usersRepository.findOne({
      where: {id_aut_user},
      relations: ['role', 'driver']
    });
  }

  //función para obtener un usuario por el nombre de usuario
  async findOneAuth(user_name?: string, password_user?: string){
    if(!user_name && !password_user)
      throw new NotFoundException
    const user: User = await this.usersRepository.findOne({
      relations: ['role', 'driver'],
      where: {user_name}
    })
    if(!await bcrypt.compare(password_user, user.password_user)){
      throw new NotFoundException
    }
    return user;
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
