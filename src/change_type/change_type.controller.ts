import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChangeTypeService } from './change_type.service';
import { CreateChangeTypeDto } from './dto/create-change_type.dto';
import { UpdateChangeTypeDto } from './dto/update-change_type.dto';

@Controller('change-type')
export class ChangeTypeController {
  constructor(private readonly changeTypeService: ChangeTypeService) {}

  @Post()
  create(@Body() createChangeTypeDto: CreateChangeTypeDto) {
    return this.changeTypeService.create(createChangeTypeDto);
  }

  @Get()
  findAll() {
    return this.changeTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.changeTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChangeTypeDto: UpdateChangeTypeDto) {
    return this.changeTypeService.update(+id, updateChangeTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.changeTypeService.remove(+id);
  }
}
