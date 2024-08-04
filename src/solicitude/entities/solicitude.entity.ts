import { Car } from "src/car/entities/car.entity";
import { DateD } from "src/date_d/entities/date_d.entity";
import { GroupTour } from "src/group_tour/entities/group_tour.entity";
import { Modification } from "src/modification/entities/modification.entity";
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

    @Column({type: 'integer', nullable: false})
    id_aut_date: number;

    @ManyToOne(() => Car, (car) => car.solicitude)
    @JoinColumn({name: 'id_car'})
    car: Car;

    @ManyToOne(() => ProgrammingType, (programmingType) => programmingType.solicitude)
    @JoinColumn({name: 'id_aut_prog_type'})
    programmingType: ProgrammingType;

    @OneToOne(() => Route, (route) => route.solicitude)
    route: Route;

    @ManyToOne(() => GroupTour, (groupTour) => groupTour.solicitude)
    @JoinColumn({name: 'id_group'})
    groupTour: GroupTour;

    @ManyToOne(() => DateD, (dateD) => dateD.solicitude)
    @JoinColumn({name: 'id_aut_date'})
    dateD: DateD;

    @OneToMany(() => Modification, (modification) => modification.solicitude)
    modification: Modification;
}
