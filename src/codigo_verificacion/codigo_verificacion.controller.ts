import { Controller } from '@nestjs/common';
import { CodigoVerificacionService } from './codigo_verificacion.service';

@Controller('codigo-verificacion')
export class CodigoVerificacionController {
  constructor(private readonly codigoVerificacionService: CodigoVerificacionService) {}
}
