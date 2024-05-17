import { Car } from "src/car/entities/car.entity";
import { TypeCarSituation } from "src/type_car_situation/entities/type_car_situation.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'car_situation'})
export class CarSituation {
    @PrimaryGeneratedColumn()
    id_cs: number;

    @Column({type: 'date'})
    return_date_cs: Date;

    @Column({type: 'date'})
    current_date_cs: Date;

    @Column({type: 'integer'})
    id_aut_type_cs: number;

    @OneToMany(() => Car, (car) => car.carSituation)
    car: Car;

    @ManyToOne(() => TypeCarSituation, (typeCarSituation) => typeCarSituation.carSituation)
    @JoinColumn({name: 'id_aut_type_cs'})
    typeCarSituation: TypeCarSituation; 
}
