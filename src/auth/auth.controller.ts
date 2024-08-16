import {Controller, Post, Query} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Query('user_name') user_name: string, @Query('password_user') password_user: string) {
    return  await this.authService.login(user_name, password_user)
  } 
}
