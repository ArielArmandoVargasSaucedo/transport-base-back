import { Body, Controller, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO.user_name, loginDTO.password_user)
  }

  @Post('changePassword')
  async changePassword(@Body() payload: { id_user: number, new_password: string, last_password?: string }) {
    return await this.authService.changePassword(payload.id_user, payload.new_password, payload.last_password)
  }

  @Post('sendEmailVerificacion/:id')
  async sendEmailVerificacion(@Param('id', ParseIntPipe) id_user) {
    await this.authService.sendEmailVerificacion(id_user)
    return { succes: true } // indica que la operación fue completada con éxito
  }

  @Post('verificarCodigoVerificacion')
  async verificarCodigoVerificacion(@Body() payload: {
    user_id: number /* hace referencia al identificador del usuario que introdujo el código */,
    code: string /* hace referencia al código introducido por el usuario */
  }) {
    await this.authService.verificarCodigoVerificacion(payload.user_id, payload.code)
    return { succes: true } // indica que la operación fue completada con éxito
  }

  @Post('getUserByEmail')
  async getUserById(@Body() payload: { email: string } /* se envia como body de la petición ya que es más seguro */) {
    return await this.authService.getUserByEmail(payload.email)
  }
}
