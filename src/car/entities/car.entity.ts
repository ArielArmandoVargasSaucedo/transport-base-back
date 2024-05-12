import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'car'})
export class Car {
    @PrimaryGeneratedColumn()
    id_car: number;

    @Column({unique: true})
    car_number: string;

    @Column()
    car_brand: string;

    @Column()
    number_of_seats: number;
}
