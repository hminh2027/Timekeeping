import { Module } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { CheckinRepository } from './checkin.repository';

@Module({
  imports: [TypeOrmExModule.forRepository([CheckinRepository])],
  exports: [CheckinService],
  controllers: [CheckinController],
  providers: [CheckinService]
})
export class CheckinModule {}
