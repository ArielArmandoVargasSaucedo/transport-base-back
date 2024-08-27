export class CreateCodigoVerificacionDTO {
    user_id: number // representa el id del usuaro al cual se le generó el código
    code: string  // representa el código de verificación generado
    generation_date?: Date // representa la fecha en la que fue generado dicho código
    constructor(user_id: number, code: string, generation_date?: Date) {
        this.user_id = user_id
        this.code = code
        this.generation_date = generation_date
    }
}