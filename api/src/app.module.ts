import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})
export class AppModule {}
