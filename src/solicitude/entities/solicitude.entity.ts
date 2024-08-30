import { Car } from "src/car/entities/car.entity";
import { Driver } from "src/driver/entities/driver.entity";
import { GroupTour } from "src/group_tour/entities/group_tour.entity";
import { ProgrammingType } from "src/programming_type/entities/programming_type.entity";
import { Route } from "src/route/entities/route.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'solicitude'})
export class Solicitude {
    @PrimaryGeneratedColumn()
    id_solicitude: number;

    @Column({type: 'time', nullable: false})
    programming_start_time: string;

    @Column({type: 'varchar', nullable: false})
    programming_to_be_done: string;

    @Column({type: 'time', nullable: false})
    duration_time: string;

    @Column({type: 'double precision', nullable: false})
    mileage: number;

    @Column({type: 'integer', nullable: false})
    id_car: number;

    @Column({type: 'integer', nullable: false})
    id_aut_prog_type: number;

    @Column({type: 'integer', nullable: false})
    id_group: number;

    @Column({type:'date'})
    dateD: Date;

    @Column({type: 'integer', nullable: false})
    id_route: number;

    @Column({type: 'integer', nullable: false})
    id_driver: number;

    @ManyToOne(() => Car, (car) => car.solicitudes)
    @JoinColumn({name: 'id_car'})
    car: Car;

    @ManyToOne(() => Driver, (driver) => driver.solicitudes)
    @JoinColumn({name: 'id_driver'})
    driver: Driver;

    @ManyToOne(() => ProgrammingType, (programmingType) => programmingType.solicitudes)
    @JoinColumn({name: 'id_aut_prog_type'})
    programmingType: ProgrammingType;

    @OneToOne(() => Route, (route) => route.solicitude)
    @JoinColumn({name: 'id_route'})
    route: Route;

    @ManyToOne(() => GroupTour, (groupTour) => groupTour.solicitudes)
    @JoinColumn({name: 'id_group'})
    groupTour: GroupTour;
}
