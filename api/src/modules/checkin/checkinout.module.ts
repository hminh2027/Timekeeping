import { Module } from '@nestjs/common';
import { CheckinService } from './services/checkinout.service';
import { CheckinController } from './controllers/checkinout.controller';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { CheckoutHistoryRepository } from './repositories/checkout-history.repository';
import { CheckOutHistoryService } from './services/checkout-history.service';
import { CheckinRepository } from './repositories/checkinout.repository';

@Module({
  imports: [
    TypeOrmExModule.forRepository([
      CheckinRepository,
      CheckoutHistoryRepository,
    ]),
  ],
  exports: [CheckinService, CheckOutHistoryService],
  controllers: [CheckinController],
  providers: [CheckinService, CheckOutHistoryService],
})
export class CheckinModule {}
