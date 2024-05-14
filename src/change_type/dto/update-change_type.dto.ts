import { PartialType } from '@nestjs/mapped-types';
import { CreateChangeTypeDto } from './create-change_type.dto';

export class UpdateChangeTypeDto extends PartialType(CreateChangeTypeDto) {}
