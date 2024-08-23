import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query("user_name") user_name: string, @Query("dni_user") dni_user: string, @Query("id_aut_role") id_aut_role: string,
  @Query("id_applicant") id_applicant: string) {
    console.log( typeof
       id_applicant === 'number')
    return this.userService.findAll(user_name, dni_user, id_aut_role ? +id_aut_role : undefined, id_applicant ? +id_applicant : undefined);
  }

  @Get('getUser/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('auth')
  async findOneAuth(@Query("user_name") user_name: string, @Query("password_user") password_user: string){
    return await this.userService.findOneAuth(user_name, password_user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
