import { Driver } from "src/driver/entities/driver.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id_aut_user: number;

    @Column({type: 'varchar', unique: true, nullable: false})
    user_name: string;

    @Column({type: 'varchar', nullable: false})
    password_user: string;

    @Column({type: 'varchar', unique: true, nullable: false})
    dni_user:string;

    @Column({type: 'integer', nullable: false})
    id_aut_role: number;

    @Column({type: 'integer', nullable: true})
    id_driver: number;

    @ManyToOne(() => Role, (role) => role.user)
    @JoinColumn({name: 'id_aut_role'})
    role: Role;

    @OneToOne(() => Driver, (driver) => driver.user)
    @JoinColumn({name: 'id_driver'})
    driver: Driver;
}
