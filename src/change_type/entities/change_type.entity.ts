import { ModChange } from "src/mod_change/entities/mod_change.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'change_type'})
export class ChangeType {
    @PrimaryGeneratedColumn()
    id_aut_change_type: number;

    @Column({type: 'varchar', unique: true, nullable: false})
    change_type_name: string;

    @OneToMany(() => ModChange, (ModChange) => ModChange.changeType)
    modChange: ModChange;
}
