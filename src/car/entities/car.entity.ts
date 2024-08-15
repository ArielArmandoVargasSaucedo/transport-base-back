import { CarSituation } from "src/car_situation/entities/car_situation.entity";
import { Driver } from "src/driver/entities/driver.entity";
import { Solicitude } from "src/solicitude/entities/solicitude.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'car'})
export class Car {
    @PrimaryGeneratedColumn()
    id_car: number;

    @Column({type:'varchar', unique: true, nullable: false})
    car_number: string;

    @Column({type: 'varchar', nullable: false})
    car_brand: string;

    @Column({type: 'integer', nullable: false})
    number_of_seats: number;

    @OneToMany(() => Driver, (driver) => driver.car)
    drivers: Array<Driver>;

    @OneToMany(() => CarSituation, (carSituation) => carSituation.car)
    carSituations: Array<CarSituation>;

    @OneToMany(() => Solicitude, solicitude => solicitude.car)
    solicitudes: Array<Solicitude>;
}
