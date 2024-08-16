import { Car } from "src/car/entities/car.entity";
import { DriverSituation } from "src/driver_situation/entities/driver_situation.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'driver'})
export class Driver {
    @PrimaryGeneratedColumn()
    id_driver: number;

    @Column({type: 'varchar' ,unique: true, nullable: false})
    dni_driver: string;

    @Column({type: 'varchar', nullable: false})
    driver_name: string;

    @Column({type: 'varchar', nullable: false})
    home_address: string;

    @Column({type: 'boolean', nullable: false})
    is_copilot: boolean;

    @Column({type: 'integer', nullable: true})
    id_car: number;

    @OneToOne(() => User, (user) => user.driver)
    user: User;

    @ManyToOne(() => Car, (car) => car.drivers)
    @JoinColumn({name: 'id_car'})
    car: Car;

    @OneToMany(() => DriverSituation, (driverSituation) => driverSituation.driver)
    driverSituations: Array<DriverSituation>;
}
