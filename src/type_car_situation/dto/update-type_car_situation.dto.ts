import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeCarSituationDto } from './create-type_car_situation.dto';

export class UpdateTypeCarSituationDto extends PartialType(CreateTypeCarSituationDto) {}
