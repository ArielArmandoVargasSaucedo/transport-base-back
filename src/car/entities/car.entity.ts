import { CarSituation } from "src/car_situation/entities/car_situation.entity";
import { Driver } from "src/driver/entities/driver.entity";
import { Solicitude } from "src/solicitude/entities/solicitude.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({type: 'integer'})
    id_cs: number;

    @OneToMany(() => Driver, (driver) => driver.car)
    driver: Driver;

    @ManyToOne(() => CarSituation, (carSituation) => carSituation.car)
    @JoinColumn({name: 'id_cs'})
    carSituation: CarSituation;

    @OneToMany(() => Solicitude, solicitude => solicitude.car)
    solicitude: Solicitude;
}
