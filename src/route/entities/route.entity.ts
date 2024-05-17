import { Solicitude } from "src/solicitude/entities/solicitude.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'route'})
export class Route {
    @PrimaryGeneratedColumn()
    id_route: number;

    @Column({type: 'double precision'})
    km_available_star: number;

    @Column({type: 'double precision'})
    km_available_end: number;

    @Column({type: 'varchar'})
    pick_up_location: string;

    @Column({type: 'time'})
    end_time: string;

    @Column({type: 'integer'})
    id_solicitude: number;

    @OneToOne(() => Solicitude, (solicitude) => solicitude.route)
    @JoinColumn({name: 'id_solicitude'})
    solicitude: Solicitude;
}
