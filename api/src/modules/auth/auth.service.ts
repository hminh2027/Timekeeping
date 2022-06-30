import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '../../common/config/config.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginPayload } from './payload/login.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async generateToken(user: User) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ ...user }),
    };
  }

  async validateUser({ email, password }: LoginPayload): Promise<any> {
    const user = await this.userService.getByEmailAndPass(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password !');
    }
    return user;
  }
}
