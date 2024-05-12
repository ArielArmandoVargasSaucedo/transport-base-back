import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'driver_situation'})
export class DriverSituation {
    @PrimaryGeneratedColumn()
    id_ds: number;

    @Column()
    return_date_ds: Date;

    @Column()
    current_date_ds: Date;
}
