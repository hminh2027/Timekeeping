import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationRepository } from './repositories/notification.repository';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { SocketModule } from '../socket/socket.module';
import { NotificationController } from './controllers/notification.controller';

@Module({
  imports: [
    SocketModule,
    TypeOrmExModule.forRepository([NotificationRepository]),
  ],
  exports: [NotificationService],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
