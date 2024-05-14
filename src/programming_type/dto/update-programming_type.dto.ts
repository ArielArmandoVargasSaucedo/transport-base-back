import { PartialType } from '@nestjs/mapped-types';
import { CreateProgrammingTypeDto } from './create-programming_type.dto';

export class UpdateProgrammingTypeDto extends PartialType(CreateProgrammingTypeDto) {}
