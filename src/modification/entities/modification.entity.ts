import { ModChange } from "src/mod_change/entities/mod_change.entity";
import { Solicitude } from "src/solicitude/entities/solicitude.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'modification'})
export class Modification {
    @PrimaryGeneratedColumn()
    id_modification: number;

    @Column({type: 'date', nullable: false})
    modification_date: Date;

    @Column({type: 'integer', nullable: false})
    id_solicitude: number;

    @OneToMany(() => ModChange, (modChange) => modChange.modification)
    modChange: ModChange;

    @ManyToOne(() => Solicitude, (solicitude) => solicitude.modification)
    @JoinColumn({name: 'id_solicitude'})
    solicitude: Solicitude;
}
