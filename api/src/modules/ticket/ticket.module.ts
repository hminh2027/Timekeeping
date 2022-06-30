import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { TicketTypeRepository } from './repository/ticket-type.repository';
import { TicketRepository } from './repository/ticket.repository';
import { TicketTypeController } from './ticket-type.controlller';
import { TicketTypeService } from './ticket-type.service';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
    imports: [TypeOrmExModule.forRepository([TicketRepository, TicketTypeRepository])],
    exports: [TicketService, TicketTypeService],
    controllers: [TicketController, TicketTypeController],
    providers: [TicketService, TicketTypeService],
})
export class TicketModule {}