import { CreateDriverSituationDto } from "src/driver_situation/dto/create-driver_situation.dto";

export class CreateDriverDto {
    dni_driver: string;
    driver_name: string;
    home_address: string;
    is_copilot: boolean;
    driver_situation: CreateDriverSituationDto;
    id_car: number;
}
