import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'mod_change'})
export class ModChange {
    @PrimaryGeneratedColumn()
    id_mod_change: number;
}
