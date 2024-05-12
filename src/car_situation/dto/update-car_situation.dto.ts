import { PartialType } from '@nestjs/mapped-types';
import { CreateCarSituationDto } from './create-car_situation.dto';

export class UpdateCarSituationDto extends PartialType(CreateCarSituationDto) {}
