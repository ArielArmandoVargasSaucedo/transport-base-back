import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'date_d'})
export class DateD {
    @PrimaryGeneratedColumn()
    id_aut_date: number;

    @Column({type: 'date'})
    id_date: Date;

    @Column({type: 'time'})
    hour_d: string;
}
