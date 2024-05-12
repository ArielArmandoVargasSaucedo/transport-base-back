import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeDriverSituationDto } from './create-type_driver_situation.dto';

export class UpdateTypeDriverSituationDto extends PartialType(CreateTypeDriverSituationDto) {}
