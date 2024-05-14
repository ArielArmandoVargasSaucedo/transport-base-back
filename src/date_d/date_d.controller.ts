import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DateDService } from './date_d.service';
import { CreateDateDDto } from './dto/create-date_d.dto';
import { UpdateDateDDto } from './dto/update-date_d.dto';

@Controller('date-d')
export class DateDController {
  constructor(private readonly dateDService: DateDService) {}

  @Post()
  create(@Body() createDateDDto: CreateDateDDto) {
    return this.dateDService.create(createDateDDto);
  }

  @Get()
  findAll() {
    return this.dateDService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dateDService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDateDDto: UpdateDateDDto) {
    return this.dateDService.update(+id, updateDateDDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dateDService.remove(+id);
  }
}
