import { CreateCarSituationDto } from "src/car_situation/dto/create-car_situation.dto";

export class CreateCarDto {
    car_number: string;
    car_brand: string;
    number_of_seats: number;
    currentCarSituation: CreateCarSituationDto;
}
