import { TypeCarSituationSerializable } from "src/type_car_situation/serializable/type-car-sisutation.serializable";

export class CarSitutationSerializable {
    id_carSituation: number;
    return_date_cs: Date;
    current_date_cs: Date;
    type_car_situation: TypeCarSituationSerializable;

    constructor(id_carSituation: number,
        return_date_cs: Date,
        current_date_cs: Date,
        type_car_situation: TypeCarSituationSerializable) {
        this.id_carSituation = id_carSituation
        this.return_date_cs = return_date_cs
        this.current_date_cs = current_date_cs
        this.type_car_situation = type_car_situation
    }
}