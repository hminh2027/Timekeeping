import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from 'src/common/config/config.module';
import { ConfigService } from 'src/common/config/config.service';
import { LoginHistoryModule } from '../login-history/login-history.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { GoogleController } from './controllers/google.controller';
import { AuthService } from './services/auth.service';
import { GoogleService } from './services/google.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    LoginHistoryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.jwtAccessTokenSecret,
          signOptions: {
            expiresIn: configService.jwtAccessTokenExpiration,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, GoogleController],
  providers: [AuthService, GoogleService, JwtStrategy, GoogleStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
