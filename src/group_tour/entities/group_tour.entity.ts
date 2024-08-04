import { Solicitude } from "src/solicitude/entities/solicitude.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'group_tour'})
export class GroupTour {
    @PrimaryGeneratedColumn()
    id_group: number;

    @Column({type: 'integer', nullable: false})
    group_code: number;

    @Column({type: 'varchar', nullable: false})
    group_country: string;

    @Column({type: 'integer', nullable: false})
    number_of_tourist: number;

    @OneToMany(() => Solicitude, (solicitude) => solicitude.groupTour)
    solicitude: Solicitude;
}
