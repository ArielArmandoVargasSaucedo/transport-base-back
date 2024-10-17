export class TypeDriverSituationSerializable {
    id_aut_type_ds: number;
    type_ds_name: string;

    constructor(
        id_aut_type_ds: number,
        type_ds_name: string
    ) {
        this.id_aut_type_ds = id_aut_type_ds
        this.type_ds_name = type_ds_name
    }
}