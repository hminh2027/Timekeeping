import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { UserModule } from '../user/user.module';
import { TicketRepository } from './repositories/ticket.repository';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';

@Module({
  imports: [TypeOrmExModule.forRepository([TicketRepository]), UserModule],
  exports: [TicketService],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
