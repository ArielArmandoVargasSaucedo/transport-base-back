import { Driver } from "src/driver/entities/driver.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id_aut_user: number;

    @Column({type: 'varchar', unique: true})
    user_name: string;

    @Column({type: 'varchar'})
    password_user: string;

    @Column({type: 'integer'})
    id_aut_role: number;

    @Column({type: 'integer'})
    id_driver: number;

    @ManyToOne(() => Role, (role) => role.user)
    @JoinColumn({name: 'id_aut_role'})
    role: Role;

    @OneToOne(() => Driver, (driver) => driver.user)
    @JoinColumn({name: 'id_driver'})
    driver: Driver;
}
