import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  constructor() {}

  afterInit(server: Server) {
    this.logger.log('Initialized!!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(client.id, 'Connected..............................');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(client.id, 'Disconnected!!!!');
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}
