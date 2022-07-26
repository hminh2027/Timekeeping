import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  logger: Logger = new Logger();
  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    this.logger.log(client.id, 'Connected....');
    const user = this.getUser(client);
    this.server.socketsJoin(user.id.toString());
    this.logger.log(`User ${user.id} join the room`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(client.id, 'Disconnected....');
    const user = this.getUser(client);
    this.server.socketsLeave(user.id.toString());
    this.logger.log(`User ${user.id} leave the room`);
  }

  @SubscribeMessage('msgToServer')
  handleMsg(@MessageBody() payload: any, room: string) {
    this.server.to(room).emit('msgToClient', payload);
  }

  getUser(client: Socket): any {
    const token = client.request.headers.authorization;
    return this.jwtService.decode(token);
  }
}
