import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'type_car_situation'})
export class TypeCarSituation {
    @PrimaryGeneratedColumn()
    id_aut_type_cs: number;

    @Column({type: 'varchar', unique: true})
    type_cs_name: string;
}
