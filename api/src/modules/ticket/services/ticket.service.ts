import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from 'src/modules/user/enums/role.enum';
import { UserService } from 'src/modules/user/services/user.service';
import { Ticket } from '../entities/ticket.entity';
import { TicketStatus } from '../enums/ticket-status.enum';
import { CreateTicketPayload } from '../payloads/create-ticket.payload';
import { UpdateTicketPayload } from '../payloads/update-ticket.payload';
import { TicketRepository } from '../repositories/ticket.repository';
import { TicketType } from '../enums/ticket-type.enum';
import { SearchQueryDto } from '../dto/search.dto';
import * as moment from 'moment';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,

    @Inject(UserService)
    private readonly userRepository: UserService,
  ) {}

  async getByRecipientId(
    id: number,
    params: SearchQueryDto,
  ): Promise<Ticket[]> {
    try {
      const tickets = await (
        await this.ticketRepository.paginationAndSearch(params)
      )
        .andWhere('tickets.recipientId = :id', { id })
        .leftJoinAndSelect('tickets.author', 'user')
        .getMany();
      return tickets.filter(
        (ticket) => ticket.ticketStatus !== TicketStatus.CANCELLED,
      );
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Bad query parameters.');
    }
  }

  async getByAuthorId(
    userId: number,
    params: SearchQueryDto,
  ): Promise<Ticket[]> {
    try {
      return await (await this.ticketRepository.paginationAndSearch(params))
        .andWhere('tickets.authorId = :authorId', { authorId: userId })
        .leftJoinAndSelect('tickets.recipient', 'user')
        .getMany();
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Bad query parameters.');
    }
  }

  async getByUserIdAndTicketId(userId: number, id: number): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { authorId: userId, id } });
  }

  async getByRecipienIdAndTicketId(
    userId: number,
    id: number,
  ): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { recipientId: userId, id } });
  }

  async getTicketType(): Promise<string[]> {
    return Object.values(TicketType);
  }

  async getByTicketId(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({ where: { id } });
  }

  async create(data: CreateTicketPayload): Promise<Ticket> {
    if (data.authorId === data.recipientId)
      throw new NotAcceptableException('Unable to send ticket to self.');

    const checkRecipientRole = await this.userRepository.checkUserRole(
      data.recipientId,
      UserRole.USER,
    );

    if (checkRecipientRole)
      throw new NotAcceptableException('Unable to send ticket to this user.');

    const isConflict = await this.checkTicketTimeConflict(data);
    if (isConflict)
      throw new NotAcceptableException('Ticket date is in conflict.');

    const isValid = this.validateTicketTime(data);
    if (!isValid) throw new NotAcceptableException('Ticket date is invalid.');
    const newTicket = await this.ticketRepository.create(data);
    return await this.ticketRepository.save(newTicket);
  }

  async adminUpdate(
    id: number,
    recipientId: number,
    ticketStatus: TicketStatus,
  ) {
    const ticket = await this.ticketRepository.findOne({
      where: { id, recipientId },
    });
    if (!ticket) throw new NotFoundException('Ticket is not found');

    if (ticket.ticketStatus === TicketStatus.CANCELLED)
      throw new NotAcceptableException(
        'This ticket is no longer be able to modify.',
      );

    await this.ticketRepository.save({
      id,
      ticketStatus,
    });
  }

  async update(id: number, data: UpdateTicketPayload): Promise<void> {
    // Check ticket existance
    const ticket = await this.ticketRepository.findOne({
      where: { id, authorId: data.authorId },
    });

    if (!ticket) throw new NotFoundException('Ticket is not found');

    // Check update condition
    if (ticket.ticketStatus !== TicketStatus.PENDING)
      throw new NotAcceptableException(
        'This ticket is no longer be able to modify.',
      );

    // update
    await this.ticketRepository.save({
      id,
      ...data,
    });
  }

  async remove(id: number): Promise<void> {
    // Check if ticket exist
    const ticketCheck = await this.ticketRepository.checkTicketExistance(id);
    if (!ticketCheck) throw new NotFoundException('Ticket is not found');

    await this.ticketRepository.delete(id);
  }

  async checkTicketTimeConflict(data: CreateTicketPayload): Promise<boolean> {
    const lastestTicket = await this.ticketRepository.findOne({
      where: [
        { authorId: data.authorId, ticketStatus: TicketStatus.APPROVED },
        { authorId: data.authorId, ticketStatus: TicketStatus.PENDING },
      ],
      order: { endDate: 'DESC' },
    });
    if (!lastestTicket) return false;
    const a = moment(lastestTicket.endDate);
    const b = moment(data.startDate);
    return b.diff(a, 'days') < 0;
  }

  validateTicketTime(data: CreateTicketPayload): boolean {
    const start = moment(data.startDate);
    const end = moment(data.endDate);
    return end.diff(start, 'seconds') >= 0;
  }
}
