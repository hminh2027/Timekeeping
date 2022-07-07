import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';

import { ConfigService } from '../../common/config/config.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ForgotPayload } from './payload/forgot.payload';
import { LoginPayload } from './payload/login.payload';
import { ResetPayload } from './payload/reset.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService
  ) {}

  async generateToken(user: User) {
    const {password, ...payload} = user

    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ ...payload }),
      user: {...payload}
    };
  }

  async validateUser({ email, password }: LoginPayload): Promise<any> {
    const passHash = createHmac('sha256', password).digest('hex');
    const user = await this.userService.getByEmailAndPass(email, passHash);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password !');
    }
    return user;
  }

  async validateToken({ email, password }: LoginPayload): Promise<any> {
    const user = await this.userService.getByEmailAndPass(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password !');
    }
    return user;
  }

  async decodingToken(token: string): Promise<any> {
    const payload = this.jwtService.verify(token);
    if(!payload) throw new UnauthorizedException('Token invalid. Please login');

    return payload;
  }

  async forgot({ email }: ForgotPayload): Promise<any> {
    // Check user existance
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new NotFoundException('User not exist !');
    }
    // Generate 15m token
    const { password, ...rest } = user;
    const token = await this.jwtService.sign({ ...rest }, { expiresIn: '15m' });
    const url = `http://localhost:3000/api/auth/reset?token=${token}`;

    // Send email
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password!',
      html: `Click <a href="${url}">here<a/> to reset your password.`
    })
    .catch(() => {
      throw new InternalServerErrorException('Something wrong in sending email.');
    });
    return 'Please check your email!';
  }

  async reset({ password, password2 }: ResetPayload, token: string): Promise<any> {
    if(password !== password2) throw new BadRequestException('Password does not match the confirmed one.')
    
    const payload = this.jwtService.verify(token);
    if(!payload) throw new BadRequestException('Token expired. Please make another forgot password request.')
    
    await this.userService.update(payload.id, { password })
    return 'Password has been reset.'
  }
}
