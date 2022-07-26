import { Injectable, NotFoundException } from '@nestjs/common';
import { SocketService } from 'src/modules/socket/socket.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationRepository } from '../repositories/notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly socketService: SocketService,
  ) {}

  async create(payload: CreateNotificationDto) {
    // this.socketService.sendNoti(payload.content, payload.userId);
    const noti = await this.notificationRepository.create(payload);
    await this.notificationRepository.save(noti);

    return;
  }

  getByRecipientId(id: number) {
    return this.notificationRepository
      .createQueryBuilder('notifications')
      .leftJoinAndSelect('notifications.recipients', 'user')
      .where('user.id = :id', { id })
      .getMany();
  }

  async updateReadNotification(id: number, userId: number) {
    const noti = await this.notificationRepository
      .createQueryBuilder('notifications')
      .leftJoinAndSelect('notifications.recipients', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('notifications.id = :id', { id })
      .getOne();
    if (!noti) throw new NotFoundException('Notification not found');
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
