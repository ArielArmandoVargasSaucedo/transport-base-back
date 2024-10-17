import { Driver } from "src/driver/entities/driver.entity";
import { TypeDriverSituation } from "src/type_driver_situation/entities/type_driver_situation.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'driver_situation' })
export class DriverSituation {
    @PrimaryGeneratedColumn()
    id_ds: number;

    @Column({ type: 'date', nullable: true })
    return_date_ds: Date;

    @Column({ type: 'date', nullable: false })
    current_date_ds: Date;

    @Column({ type: 'integer', nullable: false })
    id_aut_type_ds: number;

    @Column({ type: 'integer', nullable: false })
    id_driver: number;

    @ManyToOne(() => TypeDriverSituation, (typeDriverSituation) => typeDriverSituation.driverSituations)
    @JoinColumn({ name: 'id_aut_type_ds' })
    typeDriverSituation: TypeDriverSituation;
    @OneToOne(() => Driver, (driver) => driver.currentDriverSituation, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_driver' })
    driver: Driver;
}
