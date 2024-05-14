import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'driver_situation'})
export class DriverSituation {
    @PrimaryGeneratedColumn()
    id_ds: number;

    @Column({type: 'date'})
    return_date_ds: Date;

    @Column({type: 'date'})
    current_date_ds: Date;
}
