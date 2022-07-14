import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../../common/config/config.service';
import { AuthService } from '../services/auth.service';
import { LoginPayload } from '../payloads/login.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('access_token'),
      ]),
      secretOrKey: configService.jwtAccessTokenSecret,
      // passReqToCallback: true,
    });
  }

  async validate(payload: LoginPayload) {
    const user = await this.authService.validateToken(payload);
    if (!user) {
      throw new UnauthorizedException('Token is invalid');
    }
    return user;
  }
}
