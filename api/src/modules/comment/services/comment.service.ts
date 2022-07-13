import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  ) {}

  async create(data: CommentPayload) {
    // check user ownership & check user in recipients
    const check = await this.ticketService.getByUserIdAndTicketId(
      data.userId,
      data.ticketId,
    );
    const check2 = await this.ticketService.getByRecipienIdAndTicketId(
      data.userId,
      data.ticketId,
    );
    if (check.length === 0 && check2.length === 0)
      throw new ForbiddenException(
        'You are not allowed to comment on this ticket!',
      );

    const newComment = await this.commentRepository.create(data);
    return await this.commentRepository.save(newComment);
  }

  async getAllByTicketId(id: number): Promise<Comment[]> {
    return await this.commentRepository.find({ where: { ticketId: id } });
  }

  async findOneById(id: number): Promise<Comment> {
    return await this.commentRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateCommentPayload) {
    const comment = await this.findOneById(id);
    if (!comment) throw new NotFoundException('Comment not exist!');
    comment.content = data.content;
    return await this.commentRepository.save(comment);
  }

  async remove(id: number) {
    return await this.commentRepository.delete(id);
  }

  async checkUserPermission() {}
}
