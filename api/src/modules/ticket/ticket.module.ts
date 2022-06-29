import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TicketTypeController } from './ticket-type.controlller';
import { TicketType } from './ticket-type.entity';
import { TicketTypeService } from './ticket-type.service';
import { TicketController } from './ticket.controller';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';

@Module({
    imports: [AuthModule, UserModule, TypeOrmModule.forFeature([Ticket, TicketType])],
    exports: [TicketService, TicketTypeService],
    controllers: [TicketController, TicketTypeController],
    providers: [TicketService, TicketTypeService],
})
export class TicketModule {}