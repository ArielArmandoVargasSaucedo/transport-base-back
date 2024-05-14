import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'car'})
export class Car {
    @PrimaryGeneratedColumn()
    id_car: number;

    @Column({type:'varchar', unique: true})
    car_number: string;

    @Column({type: 'varchar'})
    car_brand: string;

    @Column({type: 'integer'})
    number_of_seats: number;
}
