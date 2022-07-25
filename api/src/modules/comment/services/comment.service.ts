import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotificationService } from 'src/modules/notification/services/notification.service';
import { SocketService } from 'src/modules/socket/socket.service';
import { TicketService } from 'src/modules/ticket/services/ticket.service';
import { Comment } from '../entities/comment.entity';
import { CommentPayload } from '../payloads/comment.payload';
import { UpdateCommentPayload } from '../payloads/update-comment.payload';
import { CommentRepository } from '../repositories/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly ticketService: TicketService,
    private readonly socketService: SocketService,
    private readonly notificationService: NotificationService,
  ) {}

  async checkOwnership(userId: number, ticketId: number) {
    const check = await this.ticketService.getByUserIdAndTicketId(
      userId,
      ticketId,
    );
    const check2 = await this.ticketService.getByRecipienIdAndTicketId(
      userId,
      ticketId,
    );
    if (check.length === 0 && check2.length === 0) return false;
    return true;
  }

  async create(data: CommentPayload) {
    // check user ownership & check user in recipients
    const checkOwnership = await this.checkOwnership(
      data.userId,
      data.ticketId,
    );
    if (!checkOwnership)
      throw new ForbiddenException(
        'You are not allowed to comment on this ticket!',
      );

    const newComment = await this.commentRepository.create(data);
    const ticket = await this.ticketService.getByTicketId(data.ticketId);
    await this.notificationService.create({
      content: `${data.userId} has commented on your ticket`,
      url: data.ticketId.toString(),
      userId: data.userId,
      recipients: [ticket.recipient],
    });

    return await this.commentRepository.save(newComment);
  }

  async getAllByTicketId(userId: number, ticketId: number): Promise<Comment[]> {
    const checkOwnership = await this.checkOwnership(userId, ticketId);
    if (!checkOwnership)
      throw new ForbiddenException(
        'You are not allowed to comment on this ticket!',
      );

    return await this.commentRepository.find({ where: { ticketId } });
  }

  async findOneByIdAndUserId(id: number, userId: number): Promise<Comment> {
    return await this.commentRepository.findOne({ where: { id, userId } });
  }

  async update(id: number, data: UpdateCommentPayload) {
    const comment = await this.findOneByIdAndUserId(id, data.userId);
    if (!comment) throw new NotFoundException('Comment not exist!');
    comment.content = data.content;
    return await this.commentRepository.save(comment);
  }

  async remove(id: number, userId: number) {
    const comment = await this.findOneByIdAndUserId(id, userId);
    if (!comment) throw new NotFoundException('Comment not exist!');
    return await this.commentRepository.delete(id);
  }
}
