import { Exclude } from "class-transformer";
import { DriverSituation } from "src/driver_situation/entities/driver_situation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'type_driver_situation'})
export class TypeDriverSituation {
    @PrimaryGeneratedColumn()
    id_aut_type_ds: number;

    @Column({type: 'varchar', unique: true, nullable: false})
    type_ds_name: string;

    @Exclude()
    @OneToMany(() => DriverSituation, (driverSituation) => driverSituation.typeDriverSituation)
    driverSituation: Array<DriverSituation>;
}
