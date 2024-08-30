import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudeDto } from './create-solicitude.dto';
import { UpdateRouteDto } from 'src/route/dto/update-route.dto';

export class UpdateSolicitudeDto {
       
    programming_to_be_done: string;
    
    mileage: number;
    
    id_car: number;
    
    id_aut_prog_type: number;
       
    dateD: Date;
      
    id_driver: number;

    route: UpdateRouteDto

}
