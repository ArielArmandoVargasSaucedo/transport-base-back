import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id_aut_user: number;

    @Column({unique: true})
    user_name: string;

    @Column()
    password_user: string;
}
