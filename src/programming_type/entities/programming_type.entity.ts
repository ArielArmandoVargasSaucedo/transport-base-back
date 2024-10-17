import { Solicitude } from "src/solicitude/entities/solicitude.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'programming_type'})
export class ProgrammingType {
    @PrimaryGeneratedColumn()
    id_aut_prog_type: number;

    @Column({type: 'varchar', unique: true, nullable: false})
    prog_type_name: string;

    @OneToMany(() => Solicitude, (solicitude) => solicitude.programmingType)
    solicitudes: Array<Solicitude>;
}
