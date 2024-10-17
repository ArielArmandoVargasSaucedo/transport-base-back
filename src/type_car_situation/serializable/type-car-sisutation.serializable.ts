export class TypeCarSituationSerializable {
    id_aut_type_cs: number;
    type_cs_name: string;

    constructor(id_aut_type_cs: number,
        type_cs_name: string) {
        this.id_aut_type_cs = id_aut_type_cs
        this.type_cs_name = type_cs_name
    }
}