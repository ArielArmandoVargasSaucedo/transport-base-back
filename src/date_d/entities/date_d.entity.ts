import { Solicitude } from "src/solicitude/entities/solicitude.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'date_d'})
export class DateD {
    @PrimaryGeneratedColumn()
    id_aut_date: number;

    @Column({type: 'date', nullable: false})
    id_date: Date;

    @Column({type: 'time', nullable: false})
    hour_d: string;

    @OneToMany(() => Solicitude, (solicitude) => solicitude.dateD)
    solicitude: Solicitude;
}
