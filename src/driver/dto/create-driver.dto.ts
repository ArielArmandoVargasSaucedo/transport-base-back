import { CreateDriverSituationDto } from "src/driver_situation/dto/create-driver_situation.dto";
import { DriverSituation } from "src/driver_situation/entities/driver_situation.entity";

export class CreateDriverDto {
    dni_driver: string;
    driver_name: string;
    home_address: string;
    is_copilot: boolean;
    driver_situation: CreateDriverSituationDto;
    id_car: number;
}
