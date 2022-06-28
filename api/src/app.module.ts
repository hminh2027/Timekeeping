import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { AuthController } from './modules/auth/auth.controller';
import { TicketController } from './modules/ticket/ticket.controller';
import { TicketModule } from './modules/ticket/ticket.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, TicketModule],
  controllers: [AppController, UserController, AuthController, TicketController],
  providers: [AppService],
})
export class AppModule {}
