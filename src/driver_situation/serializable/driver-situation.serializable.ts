import { TypeDriverSituationSerializable } from "src/type_driver_situation/serializable/type-driver-situation.serializable";

export class DriverSituationSerializable {
    id_ds: number
    id_driver: number;
    return_date_ds: Date;
    current_date_ds: Date;
    type_driver_situation: TypeDriverSituationSerializable

    constructor(id_ds: number,
        id_driver: number,
        return_date_ds: Date,
        current_date_ds: Date,
        type_driver_situation: TypeDriverSituationSerializable) {
        this.id_ds = id_ds
        this.id_driver = id_driver
        this.return_date_ds = return_date_ds
        this.current_date_ds = current_date_ds
        this.type_driver_situation = type_driver_situation
    }
}