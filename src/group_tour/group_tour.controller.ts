import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query("group_code") group_code: number, @Query("country") country: string, @Query("number_of_tourist") number_of_tourist: number) {
    return this.groupTourService.findAll(group_code, country, number_of_tourist);
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
