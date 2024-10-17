export class CreateDriverSituationDto {
    return_date_ds?: Date;
    current_date_ds?: Date; // automatizado en el back
    id_aut_type_ds: number;
    id_driver?: number; // automatizado en el back
}
