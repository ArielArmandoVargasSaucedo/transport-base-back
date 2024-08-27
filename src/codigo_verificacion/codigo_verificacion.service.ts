import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CodigoVerficacion } from './entities/codigo_verificacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCodigoVerificacionDTO } from './dto/create-codigo_verificacion.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CodigoVerificacionService {
    constructor(@InjectRepository(CodigoVerficacion) private readonly codigoVerificacionRepository: Repository<CodigoVerficacion>,
        private configService: ConfigService) { }

    // Método para registrar una tupla de código de verificación
    async create(codigoVerificacionDTO: CreateCodigoVerificacionDTO) {
        // antes de realizar la insercción se asigna la fecha actual como fecha de generación al código
        codigoVerificacionDTO.generation_date = new Date()
        // se registra la tupla del código de verificación en la base de datos
        return await this.codigoVerificacionRepository.save(this.codigoVerificacionRepository.create(codigoVerificacionDTO))
    }

    // Método para buscar un código de verificación
    async findOne(id_codigo_verificacion?: number, user_id?: number, code?: string) {
        return await this.codigoVerificacionRepository.findOne({
            where: {
                id: id_codigo_verificacion,
                user_id: user_id,
                code: code
            }
        })
    }


    // Método para verificar el código de activación de un usuario
    async verificarCodigoIdentidad(user_id: number, code: string) {
        // se busca un código de verificación con ese código para ese usuario
        const codigoVerificacion = await this.findOne(undefined, user_id, code)

        // si no fue encontrado código de verificación
        if (!codigoVerificacion)
            throw new HttpException("Código de Activación incorrecto", HttpStatus.BAD_REQUEST) // se lanza la exeption y se detiene la ejecución del método

        // si el código de verificación expiró
        if (new Date().getTime() - codigoVerificacion.generation_date.getTime() >= parseInt(this.configService.get<string>("EXPIRATION_TIME")))
            throw new HttpException("Este código de activación a expirado", HttpStatus.BAD_REQUEST) // se lanza la exeption y se detiene la ejecución del método

        // si no sucede nada de lo anterior, el código de verificación es válido
    }
}
