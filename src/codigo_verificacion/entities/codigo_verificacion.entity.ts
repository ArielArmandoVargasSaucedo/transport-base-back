import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'codigo_verficacion' })
export class CodigoVerficacion {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: false })
    user_id: number // representa el id del usuaro al cual se le generó el código
    @Column({ nullable: false })
    generation_date: Date // representa la fecha en la que fue generado dicho código
    @Column({ nullable: false })
    code: string  // representa el código de verificación generado
}