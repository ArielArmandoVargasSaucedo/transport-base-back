import { Driver } from "src/driver/entities/driver.entity";
import { TypeDriverSituation } from "src/type_driver_situation/entities/type_driver_situation.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'driver_situation'})
export class DriverSituation {
    @PrimaryGeneratedColumn()
    id_ds: number;

    @Column({type: 'date'})
    return_date_ds: Date;

    @Column({type: 'date'})
    current_date_ds: Date;

    @Column({type: 'integer'})
    id_aut_type_ds: number;

    @ManyToOne(() => TypeDriverSituation, (typeDriverSituation) => typeDriverSituation.driverSituation)
    @JoinColumn({name: 'id_aut_type_ds'})
    typeDriverSituation: TypeDriverSituation;

    @OneToMany(() => Driver, (driver) => driver.driverSituation)
    driver: Driver;
}
