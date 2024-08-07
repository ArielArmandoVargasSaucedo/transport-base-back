import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'role'})
export class Role {
    @PrimaryGeneratedColumn()
    id_aut_role: number;

    @Column({type: 'varchar', unique: true, nullable: false})
    role_type:string;

    @OneToMany(() => User, (user) => user.role)
    users: Array<User>;
}
