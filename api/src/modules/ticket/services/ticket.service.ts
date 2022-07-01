import { Inject, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { UserRole } from "src/modules/role/role.enum";
import { UserService } from "src/modules/user/user.service";
import { Ticket } from "../entities/ticket.entity";
import { CreateTicketPayload } from "../payloads/create-ticket.payload";
import { UpdateTicketPayload } from "../payloads/update-ticket.payload";
import { TicketRepository } from "../repositories/ticket.repository";

@Injectable()
export class TicketService {
    constructor(
        private readonly ticketRepository: TicketRepository,
        
        @Inject(UserService)
        private readonly userRepository: UserService
    ) {}

    async getAll(): Promise<Ticket[]> {
        try {
            return this.ticketRepository.find();

        } catch (err) {
            throw err;
        }
    }

    async create(data: CreateTicketPayload): Promise<Ticket> {
        try {
            if(data.authorId === data.recipientId) throw new NotAcceptableException('Unable to send ticket to self.');

            const checkRecipientRole = await this.userRepository.checkUserRole(data.recipientId, UserRole.USER);
            if(checkRecipientRole) throw new NotAcceptableException('Unable to send ticket to this user.');

            const newTicket = await this.ticketRepository.create(data);
            return this.ticketRepository.save(newTicket);

        } catch (err) {
            throw err;
        }
    }

    async update(id: number, data: UpdateTicketPayload) {
        try {
            // thoi han update va delete?
            // Check if ticket exist
            const ticketCheck = await this.ticketRepository.checkTicketExistance(id);
            if (!ticketCheck) throw new NotFoundException('Ticket is not found');
            
            await this.ticketRepository.update(id, data);
            
        } catch (err) {
            throw err;
        }
    }

    async remove(id: number) {
        try {
            // Check if ticket exist
            const ticketCheck = await this.ticketRepository.checkTicketExistance(id);
            if (!ticketCheck) throw new NotFoundException('Ticket is not found');
            
            await this.ticketRepository.delete(id);
            
        } catch (err) {
            throw err;
        }
    }
}