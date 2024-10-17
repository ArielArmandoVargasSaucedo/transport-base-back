import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserSerializable } from './serializable/user.serializable';
import { DriverService } from 'src/driver/driver.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository:
      Repository<User>,
    private driverService: DriverService) {
  }

  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.user_name.length < 4)
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

  async findAll(user_name?: string, id_aut_role?: number, id_applicant?: number) {
    const userSerializables: Array<UserSerializable> = new Array<UserSerializable>()
    const userList: Array<User> = await this.usersRepository.find({
      relations: ['role', 'driver'],
      where: {
        user_name: user_name ? Like(`%${user_name}%`) : user_name,
        id_aut_role
      },
    })

    // se recorre la lista para crear user serializables
    for (let index = 0; index < userList.length; index++) {
      const user = userList[index];
      if (user.id_aut_user !== id_applicant) // si el id del usuario es distinto del id del que solicita a los usuarios
      userSerializables.push(new UserSerializable(user.id_aut_user, user.user_name,
        user.email, user.role,
        user.driver ? await this.driverService.findOneSerializable(user.driver.id_driver) : undefined))
    }
    return userSerializables
  }

  async findOne(id_aut_user: number) {
    return await this.usersRepository.findOne({
      where: { id_aut_user },
      relations: ['role', 'driver']
    });
  }

  // Método para buscar a un usuario por su email
  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ // se busca al usuario por el email
      where: {
        email: email
      }
    })

    // si no fue encontrado un usuario con dicho email
    if (!user)
      throw new HttpException("El email proporcionado no existe", HttpStatus.BAD_REQUEST)

    return user
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

      if (updateUserDto.user_name.length < 4)
        throw new HttpException('El nombre del usuario debe tener al menos 4 caracteres', HttpStatus.BAD_REQUEST)


      const user = await this.findOne(id_aut_user)
      if (!user)
        throw new NotFoundException

      user.user_name = updateUserDto.user_name
      // si se mandó una nueva contraseña
      if (updateUserDto.password_user) {
        const saltOrRounds = 10
        const hash = await bcrypt.hash(updateUserDto.password_user, saltOrRounds)
        user.password_user = hash
      }
      user.email = updateUserDto.email

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

  async changePasswordUser(id_user: number, new_password: string) {
    // se busca al usuario que se le desea modificar la contraseña
    const user = await this.findOne(id_user)

    // si existe un usuario con ese id
    if (user) {
      // se actualiza la contraseña
      user.password_user = await bcrypt.hash(new_password, 10)
      // luego se actualizan los cambios en la base de datos
      await this.usersRepository.save(user)
    }
    else
      throw new HttpException("No existe un usuario con ese id", HttpStatus.BAD_REQUEST)
  }

  async verificarContraseñaUsuario(password: string, idUsuario: number): Promise<boolean> {
    let isPasswordPerteneceUsuario = false
    const usuario = await this.findOne(idUsuario)

    // si fue entontrado a un usuario con ese id
    if (usuario) {
      if (await bcrypt.compare(password, usuario.password_user)) // si las contraseñas son iguales
        isPasswordPerteneceUsuario = true
    }
    else
      throw new HttpException("No existe un usuario con ese id", HttpStatus.BAD_REQUEST)

    return isPasswordPerteneceUsuario
  }

  async remove(id_aut_user: number) {
    const user = await this.findOne(id_aut_user)
    if (!user)
      throw new NotFoundException
    return await this.usersRepository.delete(id_aut_user);
  }
}
