import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: process.env.JWT_KEY,
        signOptions: { expiresIn: '60s' },
    })],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService]
})

export class AuthModule {}
