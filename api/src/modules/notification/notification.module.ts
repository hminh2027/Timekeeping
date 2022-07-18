import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';
import { NotificationRepository } from './repositories/notification.repository';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forRepository([NotificationRepository])],
  exports: [NotificationService],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
