import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { TypeOrmExModule } from './typeorm-ex.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, TypeOrmExModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
