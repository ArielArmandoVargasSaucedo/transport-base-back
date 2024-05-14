import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'driver'})
export class Driver {
    @PrimaryGeneratedColumn()
    id_driver: number;

    @Column({type: 'varchar' ,unique: true})
    dni_driver: string;

    @Column({type: 'varchar'})
    driver_name: string;

    @Column({type: 'varchar'})
    home_address: string;

    @Column({type: 'varchar'})
    category: string;

    @Column({type: 'boolean'})
    is_copilot: boolean;
}
