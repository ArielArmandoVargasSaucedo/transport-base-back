import { CarSitutationSerializable } from "src/car_situation/serializable/car-situation.serializable";

export class CarSerializable {
    id_car: number;
    car_number: string;
    car_brand: string;
    number_of_seats: number;
    currentCarSituation: CarSitutationSerializable;

    constructor(id_car: number,
        car_number: string,
        car_brand: string,
        number_of_seats: number,
        currentCarSituation: CarSitutationSerializable) {
        this.id_car = id_car
        this.car_number = car_number
        this.car_brand = car_brand
        this.number_of_seats = number_of_seats
        this.currentCarSituation = currentCarSituation
    }
}