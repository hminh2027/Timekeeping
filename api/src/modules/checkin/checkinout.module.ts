import { Module } from '@nestjs/common';
import { CheckinService } from './services/checkinout.service';
import { CheckinController } from './controllers/checkin.controller';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { CheckoutHistoryRepository } from './repositories/checkout-history.repository';
import { CheckOutHistoryService } from './services/checkout-history.service';
import { CheckinRepository } from './repositories/checkinout.repository';
import { CheckoutController } from './controllers/checkout.controller';
import { TicketModule } from '../ticket/ticket.module';

@Module({
  imports: [
    TicketModule,
    TypeOrmExModule.forRepository([
      CheckinRepository,
      CheckoutHistoryRepository,
    ]),
  ],
  exports: [CheckinService, CheckOutHistoryService],
  controllers: [CheckinController, CheckoutController],
  providers: [CheckinService, CheckOutHistoryService],
})
export class CheckinModule {}
