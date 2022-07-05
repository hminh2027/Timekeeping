import { Module } from '@nestjs/common';
import { CheckinService } from './checkinout.service';
import { CheckinController } from './checkinout.controller';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { CheckinRepository } from './checkinout.repository';
import { CheckoutHistoryRepository } from './checkout-history.repository';
import { CheckOutHistoryService } from './checkout-history.service';

@Module({
  imports: [TypeOrmExModule.forRepository([CheckinRepository, CheckoutHistoryRepository])],
  exports: [CheckinService, CheckOutHistoryService],
  controllers: [CheckinController],
  providers: [CheckinService, CheckOutHistoryService]
})
export class CheckinModule {}
