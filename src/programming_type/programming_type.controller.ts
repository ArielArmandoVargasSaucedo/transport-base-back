import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ProgrammingTypeService } from './programming_type.service';
import { CreateProgrammingTypeDto } from './dto/create-programming_type.dto';
import { UpdateProgrammingTypeDto } from './dto/update-programming_type.dto';

@Controller('programming-type')
export class ProgrammingTypeController {
  constructor(private readonly programmingTypeService: ProgrammingTypeService) {}

  @Post()
  create(@Body() createProgrammingTypeDto: CreateProgrammingTypeDto) {
    return this.programmingTypeService.create(createProgrammingTypeDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query("prog_type_name") prog_type_name: string) {
    return this.programmingTypeService.findAll(prog_type_name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programmingTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgrammingTypeDto: UpdateProgrammingTypeDto) {
    return this.programmingTypeService.update(+id, updateProgrammingTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programmingTypeService.remove(+id);
  }
}
