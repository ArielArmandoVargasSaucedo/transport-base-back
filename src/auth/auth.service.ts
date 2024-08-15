import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async login(user_name: string, password_user: string){
      const user: User = await this.userService.findOneAuth(user_name, password_user)
      let res: {
        access_token: string, payload: {
            userId: number,
            role: number
        }
    } | undefined = undefined
      const payload = {userId: user.id_aut_user, role: user.id_aut_role}
      const access_token = await this.jwtService.signAsync(payload)
      res = { access_token: access_token, payload }
      return res;
    }
}
