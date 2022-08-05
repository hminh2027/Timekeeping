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
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { log } from 'console';

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
    const user = await this.getUser(client);

    if (!user) throw new UnauthorizedException('Token not found');
    // this.server.socketsJoin(user.id.toString());

    client.join(user.id.toString());
    this.logger.log(`User ${user.id} join the room`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(client.id, 'Disconnected....');
    // const user = this.getUser(client);
    // if (!user) throw new UnauthorizedException('Token not found');
    // this.server.socketsLeave(user.id.toString());
    // this.logger.log(`User ${user.id} leave the room`);
  }

  @SubscribeMessage('msgToServer')
  emitEvent(@MessageBody() payload: any, rooms: string[]) {
    if (!rooms) return;
    rooms.forEach((room) => {
      this.server.to(room).emit('msgToClient', payload);
    });
    // this.server.emit('msgToClient', payload);
  }

  async getUser(client: Socket): Promise<any> {
    try {
      const token = client.request.headers.authorization;
      console.log(this.jwtService.decode(token));
      console.log(token);
      return this.jwtService.decode(token);
    } catch (err) {
      throw new UnauthorizedException('User not found');
    }
  }
}
