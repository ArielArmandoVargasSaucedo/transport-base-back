import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
