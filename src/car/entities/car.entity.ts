import { CarSituation } from "src/car_situation/entities/car_situation.entity";
import { Driver } from "src/driver/entities/driver.entity";
import { Solicitude } from "src/solicitude/entities/solicitude.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarSitutationSerializable } from "src/car_situation/serializable/car-situation.serializable";

@Entity({ name: 'car' })
export class Car {
    @PrimaryGeneratedColumn()
    id_car: number;

    @Column({ type: 'varchar', unique: true, nullable: false })
    car_number: string;

    @Column({ type: 'varchar', nullable: false })
    car_brand: string;

    @Column({ type: 'integer', nullable: false })
    number_of_seats: number;

    @OneToMany(() => Driver, (driver) => driver.car)
    drivers: Array<Driver>;

    @Column({ type: 'json', nullable: false })
    historyCarSituations: Array<CarSitutationSerializable> // representa el historial de situaciones del carro

    @OneToOne(() => CarSituation, (carSituation => carSituation.car))
    currentCarSituation: CarSituation // representa la situación del carro actual

    @OneToMany(() => Solicitude, solicitude => solicitude.car)
    solicitudes: Array<Solicitude>;
}
