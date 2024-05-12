import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'type_driver_situation'})
export class TypeDriverSituation {
    @PrimaryGeneratedColumn()
    id_type_ds: number;

    @Column({unique: true})
    type_ds_name: string;
}
