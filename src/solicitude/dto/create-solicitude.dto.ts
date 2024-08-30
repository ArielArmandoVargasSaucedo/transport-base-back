import { CreateGroupTourDto } from "src/group_tour/dto/create-group_tour.dto";
import { CreateRouteDto } from "src/route/dto/create-route.dto";

export class CreateSolicitudeDto {
    programming_start_time: string;
    programming_to_be_done: string;
    duration_time: string;
    mileage: number;
    id_car: number;
    id_aut_prog_type: number;
    group: CreateGroupTourDto;
    dateD: Date;
    routeDTO: CreateRouteDto;
}
