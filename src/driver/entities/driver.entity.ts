import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'driver'})
export class Driver {
    @PrimaryGeneratedColumn()
    id_driver: number;

    @Column({unique: true})
    dni_driver: string;

    @Column()
    driver_name: string;

    @Column()
    home_address: string;

    @Column()
    category: string;

    @Column()
    is_copilot: boolean;
}
