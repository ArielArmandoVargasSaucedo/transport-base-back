import { CarSerializable } from "src/car/serializable/car.serializable";
import { DriverSituationSerializable } from "src/driver_situation/serializable/driver-situation.serializable";

export class DriverSerializable {
    id: number;
    dni_driver: string;
    driver_name: string;
    home_address: string;
    is_copilot: boolean;
    driver_situation: DriverSituationSerializable
    car: CarSerializable

    constructor(id: number,
        dni_driver: string,
        driver_name: string,
        home_address: string,
        is_copilot: boolean,
        driver_situation: DriverSituationSerializable,
        car: CarSerializable) {
        this.id = id
        this.dni_driver = dni_driver
        this.driver_name = driver_name
        this.home_address = home_address
        this.is_copilot = is_copilot
        this.driver_situation = driver_situation
        this.car = car
    }
}