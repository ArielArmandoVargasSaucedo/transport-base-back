import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupTourService } from './group_tour.service';
import { CreateGroupTourDto } from './dto/create-group_tour.dto';
import { UpdateGroupTourDto } from './dto/update-group_tour.dto';

@Controller('group-tour')
export class GroupTourController {
  constructor(private readonly groupTourService: GroupTourService) {}

  @Post()
  create(@Body() createGroupTourDto: CreateGroupTourDto) {
    return this.groupTourService.create(createGroupTourDto);
  }

  @Get()
  findAll() {
    return this.groupTourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupTourService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupTourDto: UpdateGroupTourDto) {
    return this.groupTourService.update(+id, updateGroupTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupTourService.remove(+id);
  }
}
