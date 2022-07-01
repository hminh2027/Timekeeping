import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { UserModule } from '../user/user.module';
import { TicketTypeRepository } from './repositories/ticket-type.repository';
import { TicketRepository } from './repositories/ticket.repository';
import { TicketTypeController } from './controllers/ticket-type.controlller';
import { TicketTypeService } from './services/ticket-type.service';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { TicketStatusRepository } from './repositories/ticket-status.repository';
import { TicketStatusService } from './services/ticket-status.service';
import { TicketStatusController } from './controllers/ticket-status.controller';

@Module({
    imports: [TypeOrmExModule.forRepository([TicketRepository, TicketTypeRepository, TicketStatusRepository]), UserModule],
    exports: [TicketService, TicketTypeService, TicketStatusService],
    controllers: [TicketController, TicketTypeController, TicketStatusController],
    providers: [TicketService, TicketTypeService, TicketStatusService],
})
export class TicketModule {}