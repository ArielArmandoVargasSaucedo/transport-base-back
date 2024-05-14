import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModificationService } from './modification.service';
import { CreateModificationDto } from './dto/create-modification.dto';
import { UpdateModificationDto } from './dto/update-modification.dto';

@Controller('modification')
export class ModificationController {
  constructor(private readonly modificationService: ModificationService) {}

  @Post()
  create(@Body() createModificationDto: CreateModificationDto) {
    return this.modificationService.create(createModificationDto);
  }

  @Get()
  findAll() {
    return this.modificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModificationDto: UpdateModificationDto) {
    return this.modificationService.update(+id, updateModificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modificationService.remove(+id);
  }
}
