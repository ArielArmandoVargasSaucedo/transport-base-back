import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { CodigoVerificacionService } from 'src/codigo_verificacion/codigo_verificacion.service';
import { CreateCodigoVerificacionDTO } from 'src/codigo_verificacion/dto/create-codigo_verificacion.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { SendEmailDTO } from 'src/mailer/send-email.dto';
import { codigoVerificacionIdentidadHTML } from 'src/templates/codigo-verificacion-identidad-html';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private mailerService: MailerService, private configService: ConfigService,
    private codigoVerificacionService: CodigoVerificacionService
  ) { }

  async login(user_name: string, password_user: string) {
    const user: User = await this.userService.findOneAuth(user_name, password_user)
    let res: {
      access_token: string, payload: {
        userId: number,
        role: number,
      }
    } | undefined = undefined
    const payload = { userId: user.id_aut_user, role: user.role.id_aut_role }
    const access_token = await this.jwtService.signAsync(payload)
    res = { access_token: access_token, payload }
    return res;
  }

  // Método para cambiar la contraseña de un usuario
  async changePassword(id_user: number, new_password: string, last_password?: string) {
    // si se optó por el método de verificación de contraseña
    // se verifica antes que la contraseña anterior pertenezca realmente al usuario
    // (Para ello, el método "verificarContraseñaUsuario" debe retornar false )
   
    if (last_password && !(await this.userService.verificarContraseñaUsuario(last_password, id_user)))
      throw new HttpException("La contraseña anterior es incorrecta.", HttpStatus.BAD_REQUEST)
    await this.userService.changePasswordUser(id_user, new_password)
  }

  // Método para verificar que un código de identidad sea válido
  public async verificarCodigoVerificacion(user_id: number, code: string) {
    await this.codigoVerificacionService.verificarCodigoIdentidad(user_id, code) // si el método no lanza ninguna exeption, significa que el código de verificación es válido
  }

  // Método para enviar un correo de verificación
  async sendEmailVerificacion(id_user: number /* identificador del usuario al cual se le va a mandar el correo */) {
    // se busca la información del usuario destinatario
    const user = await this.userService.findOne(id_user)
    // se genera el código de verificación
    const codVerificacion = this.generarCodigoActivacion(8).toString()
    await this.mailerService.sendEmail(new SendEmailDTO([{ name: user.user_name, address: user.email }], "Verificación de Correo", "Verificación de Correo",
      codigoVerificacionIdentidadHTML(this.configService.get<string>("NAME_APP"),
        codVerificacion, user.user_name, this.configService.get<string>("EMAIL_APP"))))
    // se registra el código de activación como parte del usuario en la base de datos
    await this.codigoVerificacionService.create(new CreateCodigoVerificacionDTO(user.id_aut_user, codVerificacion))
  }

  // Método para generar un código de activicación de cuenta
  generarCodigoActivacion(length: number): String {
    // Genera un código aleatorio en formato hexadecimal y lo recorta al tamaño deseado
    return randomBytes(length).toString('hex').slice(0, length);
  }

  // Método para obtener el identificador de un usuario dado su email (proceso de verificación de identidad)
  async getUserByEmail(email: string) {
    return { user_id: (await this.userService.findOneByEmail(email)).id_aut_user }
  }
}
