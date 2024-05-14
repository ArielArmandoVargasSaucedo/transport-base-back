import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModChangeService } from './mod_change.service';
import { CreateModChangeDto } from './dto/create-mod_change.dto';
import { UpdateModChangeDto } from './dto/update-mod_change.dto';

@Controller('mod-change')
export class ModChangeController {
  constructor(private readonly modChangeService: ModChangeService) {}

  @Post()
  create(@Body() createModChangeDto: CreateModChangeDto) {
    return this.modChangeService.create(createModChangeDto);
  }

  @Get()
  findAll() {
    return this.modChangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modChangeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModChangeDto: UpdateModChangeDto) {
    return this.modChangeService.update(+id, updateModChangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modChangeService.remove(+id);
  }
}
