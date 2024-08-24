import { Solicitude } from "src/solicitude/entities/solicitude.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'route'})
export class Route {
    @PrimaryGeneratedColumn()
    id_route: number;

    @Column({type: 'double precision', nullable: false})
    km_available_star: number;

    @Column({type: 'double precision', nullable: false})
    km_available_end: number;

    @Column({type: 'varchar', nullable: false})
    pick_up_location: string;

    @Column({type: 'time', nullable: false})
    end_time: string;

    @OneToOne(() => Solicitude, (solicitude) => solicitude.route)
    solicitude: Solicitude;
}
