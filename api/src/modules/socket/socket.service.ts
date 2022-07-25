import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
  constructor(private readonly socketGateway: SocketGateway) {}

  sendNoti(message: any, recipient: number) {
    this.socketGateway.handleMsg(message, recipient.toString());
  }
}
