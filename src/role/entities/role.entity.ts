import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'role'})
export class Role {
    @PrimaryGeneratedColumn()
    id_aut_role: number;

    @Column({type: 'varchar', unique: true})
    role_type:string;
}
