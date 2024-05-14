import { PartialType } from '@nestjs/mapped-types';
import { CreateDateDDto } from './create-date_d.dto';

export class UpdateDateDDto extends PartialType(CreateDateDDto) {}
