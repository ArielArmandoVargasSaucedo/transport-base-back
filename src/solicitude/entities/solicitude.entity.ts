import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'solicitude'})
export class Solicitude {
    @PrimaryGeneratedColumn()
    id_solicitude: number;

    @Column({type: 'time'})
    programming_start_time: string;

    @Column({type: 'varchar'})
    programming_to_be_done: string;

    @Column({type: 'time'})
    duration_time: string;
}
