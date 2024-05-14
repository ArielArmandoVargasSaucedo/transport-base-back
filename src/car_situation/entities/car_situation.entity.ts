import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'car_situation'})
export class CarSituation {
    @PrimaryGeneratedColumn()
    id_cs: number;

    @Column({type: 'date'})
    return_date_cs: Date;

    @Column({type: 'date'})
    current_date_cs: Date;
}
