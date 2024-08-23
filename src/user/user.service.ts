import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository:
      Repository<User>) {
  }

  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.dni_user.length !== 11)
        throw new HttpException('El dni del usuario debe tener 11 caracteres', HttpStatus.BAD_REQUEST)
      else if (!/^\d+$/.test(createUserDto.dni_user) || !/^[^*_\[\]'"]+$/.test(createUserDto.dni_user))
        throw new HttpException('El dni del usuario debe contener solo números', HttpStatus.BAD_REQUEST)
      else if (createUserDto.user_name.length < 4)
        throw new HttpException('El nombre del usuario debe tener al menos 4 caracteres', HttpStatus.BAD_REQUEST)
      else if (createUserDto.password_user.length < 8)
        throw new HttpException('La contraseña del usuario debe tener al menos 8 caracteres', HttpStatus.BAD_REQUEST)

      const user = this.usersRepository.create(createUserDto)

      //Encriptar contraseña
      const saltOrRounds = 10
      const hash = await bcrypt.hash(user.password_user, saltOrRounds)
      user.password_user = hash

      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code == '23505') {
        if (error.detail.includes('user_name'))
          throw new HttpException('El nombre de usuario ya existe', HttpStatus.BAD_REQUEST)
        else if (error.detail.includes('dni_user'))
          throw new HttpException('El dni del usuario ya existe', HttpStatus.BAD_REQUEST)
      }
      throw error;
    }
  }

  async findAll(user_name?: string, dni_user?: string, id_aut_role?: number, id_applicant?: number) {
    const userList: Array<User> = await this.usersRepository.find({
      relations: ['role', 'driver'],
      where: {
        user_name: user_name ? Like(`%${user_name}%`) : user_name,
        dni_user: dni_user ? Like(`%${dni_user}%`) : dni_user,
        id_aut_role
      },
    })
    return userList.filter((user)=>{
      return user.id_aut_user !== id_applicant
    });
  }

  async findOne(id_aut_user: number) {
    return await this.usersRepository.findOne({
      where: { id_aut_user },
      relations: ['role', 'driver']
    });
  }

  //Función para obtener un usuario por el nombre de usuario
  async findOneAuth(user_name?: string, password_user?: string) {
    if (!user_name && !password_user)
      throw new HttpException('Se necesita proporcionar  nombre de usuario y contraseña', HttpStatus.BAD_REQUEST)
    const user: User | undefined = await this.usersRepository.findOne({
      relations: ['role', 'driver'],
      where: { user_name }
    })
    if (!user)
      throw new HttpException('Nombre de usuario o contraseña incorrecta', HttpStatus.BAD_REQUEST)
    // si se encontró un usuario con ese nombre
    if (!await bcrypt.compare(password_user, user.password_user)) {
      throw new HttpException('Nombre de usuario o contraseña incorrecta', HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  async update(id_aut_user: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.dni_user.length !== 11)
        throw new HttpException('El dni del usuario debe tener 11 caracteres', HttpStatus.BAD_REQUEST)
      else if (!/^\d+$/.test(updateUserDto.dni_user) || !/^[^*_\[\]'"]+$/.test(updateUserDto.dni_user))
        throw new HttpException('El dni del usuario debe contener solo números', HttpStatus.BAD_REQUEST)
      else if (updateUserDto.user_name.length < 4)
        throw new HttpException('El nombre del usuario debe tener al menos 4 caracteres', HttpStatus.BAD_REQUEST)
      else if (updateUserDto.password_user.length < 8)
        throw new HttpException('La contraseña del usuario debe tener al menos 8 caracteres', HttpStatus.BAD_REQUEST)

      const user = await this.findOne(id_aut_user)
      if (!user)
        throw new NotFoundException
      Object.assign(user, updateUserDto)

      //Encriptar contraseña
      const saltOrRounds = 10
      const hash = await bcrypt.hash(user.password_user, saltOrRounds)
      user.password_user = hash

      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code == '23505') {
        if (error.detail.includes('user_name'))
          throw new HttpException('El nombre de usuario ya existe', HttpStatus.BAD_REQUEST)
        else if (error.detail.includes('dni_user'))
          throw new HttpException('El dni del usuario ya existe', HttpStatus.BAD_REQUEST)
      }
      throw error;
    }
  }

  async remove(id_aut_user: number) {
    const user = await this.findOne(id_aut_user)
    if (!user)
      throw new NotFoundException
    return await this.usersRepository.delete(id_aut_user);
  }
}
