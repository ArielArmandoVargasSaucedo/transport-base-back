import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'car_situation'})
export class CarSituation {
    @PrimaryGeneratedColumn()
    id_cs: number;

    @Column()
    return_date_cs: Date;

    @Column()
    current_date_cs: Date;
}
