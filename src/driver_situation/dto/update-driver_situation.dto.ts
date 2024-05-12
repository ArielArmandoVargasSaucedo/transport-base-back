import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverSituationDto } from './create-driver_situation.dto';

export class UpdateDriverSituationDto extends PartialType(CreateDriverSituationDto) {}
