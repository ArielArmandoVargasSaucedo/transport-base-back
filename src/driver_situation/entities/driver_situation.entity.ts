import { Driver } from "src/driver/entities/driver.entity";
import { TypeDriverSituation } from "src/type_driver_situation/entities/type_driver_situation.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'driver_situation'})
export class DriverSituation {
    @PrimaryGeneratedColumn()
    id_ds: number;

    @Column({type: 'date', nullable: true})
    return_date_ds: Date;

    @Column({type: 'date', nullable: false})
    current_date_ds: Date;

    @Column({type: 'integer', nullable: false})
    id_aut_type_ds: number;

    @Column({type: 'integer', nullable: false})
    id_driver: number;

    @ManyToOne(() => TypeDriverSituation, (typeDriverSituation) => typeDriverSituation.driverSituations)
    @JoinColumn({name: 'id_aut_type_ds'})
    typeDriverSituation: TypeDriverSituation;

<<<<<<< HEAD
    @ManyToOne(() => Driver, (driver) => driver.driverSituations)
=======
    @ManyToOne(() => Driver, (driver) => driver.driverSituation, {onDelete: 'CASCADE'})
>>>>>>> ecb2b481de0f4e4e95a44c031507c3170f9b711c
    @JoinColumn({name: 'id_driver'})
    driver: Driver;
}
