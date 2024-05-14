import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'change_type'})
export class ChangeType {
    @PrimaryGeneratedColumn()
    id_aut_change_type: number;

    @Column({type: 'varchar', unique: true})
    change_type_name: string;
}
