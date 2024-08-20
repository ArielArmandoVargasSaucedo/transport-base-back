import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  public async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO.user_name, loginDTO.password_user)
  }
}
