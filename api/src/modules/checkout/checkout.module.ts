import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { CheckoutRepository } from './checkout.repository';

@Module({
  imports: [TypeOrmExModule.forRepository([CheckoutRepository])],
  exports: [CheckoutService],
  controllers: [CheckoutController],
  providers: [CheckoutService]
})
export class CheckoutModule {}
