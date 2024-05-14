import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'group_tour'})
export class GroupTour {
    @PrimaryGeneratedColumn()
    id_group: number;

    @Column({type: 'integer'})
    group_code: number;

    @Column({type: 'varchar'})
    group_country: string;

    @Column({type: 'integer'})
    number_of_tourist: number;
}
