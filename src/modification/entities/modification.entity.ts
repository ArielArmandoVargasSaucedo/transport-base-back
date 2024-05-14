import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'modification'})
export class Modification {
    @PrimaryGeneratedColumn()
    id_modification: number;

    @Column({type: 'date'})
    modification_date: Date;
}
