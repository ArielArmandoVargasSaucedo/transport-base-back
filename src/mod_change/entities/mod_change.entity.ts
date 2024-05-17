import { ChangeType } from "src/change_type/entities/change_type.entity";
import { Modification } from "src/modification/entities/modification.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'mod_change'})
export class ModChange {
    @PrimaryGeneratedColumn()
    id_mod_change: number;

    @Column({type: 'integer'})
    id_aut_change_type: number;

    @Column({type: 'integer'})
    id_modification: number;

    @ManyToOne(() => ChangeType, (changeType) => changeType.modChange)
    @JoinColumn({name: 'id_aut_change_type'})
    changeType: ChangeType;

    @ManyToOne(() => Modification, (modification) => modification.modChange)
    @JoinColumn({name: 'id_modification'})
    modification: Modification;
}
