import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  exports: [SocketService],
  providers: [SocketGateway, SocketService, JwtService],
})
export class SocketModule {}
