import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
dotenv.config();

@Module({
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: process.env.JWT_KEY,
        signOptions: { expiresIn: '1d' },
    })],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    exports: [AuthService]
})

export class AuthModule {}
