import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
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

  handleDisconnect(client: Socket) {
    this.logger.log(client.id, 'Disconnected!!!!');
  }
  afterInit(server: Server) {
    this.logger.log('Initialized!!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(client.id, 'Connected..............................');
  }
}
