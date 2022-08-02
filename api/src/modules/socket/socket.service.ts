import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
  constructor(private readonly socketGateway: SocketGateway) {}

  sendNoti(message: any, recipients: string[]) {
    this.socketGateway.emitEvent(message, recipients);
  }
}
