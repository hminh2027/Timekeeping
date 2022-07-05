import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { UserModule } from '../user/user.module';
import { TicketRepository } from './ticket.repository';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
    imports: [TypeOrmExModule.forRepository([TicketRepository]), UserModule],
    exports: [TicketService],
    controllers: [TicketController],
    providers: [TicketService],
})
export class TicketModule {}