import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';
import { CommentRepository } from './repositories/comment.repository';
import { TicketModule } from '../ticket/ticket.module';

@Module({
  imports: [TicketModule, TypeOrmExModule.forRepository([CommentRepository])],
  exports: [CommentService],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
