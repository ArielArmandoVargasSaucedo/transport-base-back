import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query("user_name") user_name: string,  @Query("id_aut_role") id_aut_role: string,
  @Query("id_applicant") id_applicant: string) {
    console.log(id_aut_role)
    return await this.userService.findAll(user_name, id_aut_role ? +id_aut_role : undefined, id_applicant ? +id_applicant : undefined);
  }

  @Get('getUser/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Get('auth')
  async findOneAuth(@Query("user_name") user_name: string, @Query("password_user") password_user: string){
    return await this.userService.findOneAuth(user_name, password_user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
