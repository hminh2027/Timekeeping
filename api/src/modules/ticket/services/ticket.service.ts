import {
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

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,

    @Inject(UserService)
    private readonly userRepository: UserService,
  ) {}

  async getAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async getByUserId(userId): Promise<Ticket[]> {
    return this.ticketRepository.find({ where: { authorId: userId } });
  }

  async getTicketType(): Promise<string[]> {
    return Object.values(TicketType);
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

    const newTicket = await this.ticketRepository.create(data);
    return this.ticketRepository.save(newTicket);
  }

  async update(id: number, data: UpdateTicketPayload): Promise<void> {
    // Check ticket existance
    const ticketCheck = await this.ticketRepository.findOne({
      where: { id },
    });
    if (!ticketCheck) throw new NotFoundException('Ticket is not found');

    // Check update condition
    if (ticketCheck.ticketStatus !== TicketStatus.PENDING)
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
}
