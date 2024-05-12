import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'type_car_situation'})
export class TypeCarSituation {
    @PrimaryGeneratedColumn()
    id_type_cs: number;

    @Column({unique: true})
    type_cs_name: string;
}
