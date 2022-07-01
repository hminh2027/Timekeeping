import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { UserModule } from '../user/user.module';
import { TicketTypeRepository } from './repositories/ticket-type.repository';
import { TicketRepository } from './repositories/ticket.repository';
import { TicketTypeController } from './controllers/ticket-type.controlller';
import { TicketTypeService } from './services/ticket-type.service';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';

@Module({
    imports: [TypeOrmExModule.forRepository([TicketRepository, TicketTypeRepository]), UserModule],
    exports: [TicketService, TicketTypeService],
    controllers: [TicketController, TicketTypeController],
    providers: [TicketService, TicketTypeService],
})
export class TicketModule {}