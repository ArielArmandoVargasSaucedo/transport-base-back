import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudeDto } from './create-solicitude.dto';

export class UpdateSolicitudeDto {
       
    programming_start_time: string;

    programming_to_be_done: string;
    
    duration_time: string;
  
    mileage: number;
    
    id_car: number;
    
    id_aut_prog_type: number;
       
    dateD: Date;
    
    id_route: number;
    
    id_driver: number;

}
