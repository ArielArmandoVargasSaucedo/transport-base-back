import { Car } from "src/car/entities/car.entity";
import { TypeCarSituation } from "src/type_car_situation/entities/type_car_situation.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'car_situation' })
export class CarSituation {
    @PrimaryGeneratedColumn()
    id_cs: number;

    @Column({ type: 'date', nullable: true })
    return_date_cs: Date;

    @Column({ type: 'date', nullable: false })
    current_date_cs: Date;

    @Column({ type: 'integer', nullable: false })
    id_aut_type_cs: number;

    @Column()
    id_car: number
    
    @ManyToOne(() => TypeCarSituation, (typeCarSituation) => typeCarSituation.carSituations)
    @JoinColumn({ name: 'id_aut_type_cs' })
    typeCarSituation: TypeCarSituation;
    @OneToOne(() => Car, (car) => car.currentCarSituation, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "id_car" })
    car: Car;
}
