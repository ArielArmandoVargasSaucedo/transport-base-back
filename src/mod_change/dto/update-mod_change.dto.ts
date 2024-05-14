import { PartialType } from '@nestjs/mapped-types';
import { CreateModChangeDto } from './create-mod_change.dto';

export class UpdateModChangeDto extends PartialType(CreateModChangeDto) {}
