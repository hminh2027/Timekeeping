import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';

import { ConfigService } from '../../common/config/config.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TokenQueryDto } from './dto/Token.dto';
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
    const {password, ...payload} = user;
    console.log(payload)

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
      throw new UnauthorizedException('Wrong email or password!');
    }
    return user;
  }

  async validateToken({ email }: LoginPayload): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Token invalid!');
    }
    return user;
  }

  async forgot({ email }: ForgotPayload): Promise<any> {
    // Check user existance
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new NotFoundException('User not exist!');
    }
    // Generate 15m token
    const token = await this.jwtService.sign({ id: user.id, isResetToken: true }, { expiresIn: '15m' });
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

  async reset({ password, password2 }: ResetPayload, params: TokenQueryDto): Promise<any> {
    if(password !== password2) throw new NotAcceptableException('Password does not match the confirmed one.')
    
    try {
      const payload = await this.jwtService.verify(params.token);
      if(!payload.isResetToken) throw new  NotAcceptableException('Token invalid. Please make another forgot password request.')

      await this.userService.update(payload.id, { password })
      return 'Password has been reset.'

    } catch (err) {
      throw new  BadRequestException('Token expired. Please make another forgot password request.')
    }     
  }
}
