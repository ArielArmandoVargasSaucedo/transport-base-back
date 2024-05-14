import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'programming_type'})
export class ProgrammingType {
    @PrimaryGeneratedColumn()
    id_aut_prog_type: number;

    @Column({type: 'varchar', unique: true})
    prog_type_name: string;
}
