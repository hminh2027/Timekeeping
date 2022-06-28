import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TicketController } from './ticket.controller';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';

@Module({
    imports: [AuthModule, UserModule, TypeOrmModule.forFeature([Ticket])],
    exports: [TicketService],
    controllers: [TicketController],
    providers: [TicketService],
})
export class TicketModule {}