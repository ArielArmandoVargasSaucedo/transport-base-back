import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupTourDto } from './create-group_tour.dto';

export class UpdateGroupTourDto extends PartialType(CreateGroupTourDto) {}
