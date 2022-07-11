import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '../../../common/config/config.service';
import { AuthService } from '../services/auth.service';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { LoginPayload } from '../payloads/login.payload';
import { JwtPayload } from '../payloads/jwt.payload';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class RTJwtStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('refresh_token'),
      ]),
      secretOrKey: configService.jwtRefreshTokenSecret,
      // passReqToCallback: true,
    });
  }

  async validate(token: string) {
    // const user = await this.authService.validateToken(accessToken);
    // if (!user) {
    //   throw new UnauthorizedException('Token is invalid');
    // }
    // return user;
  }
}
