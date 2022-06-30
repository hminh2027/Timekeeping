import { Injectable, NotFoundException } from "@nestjs/common";
import { Ticket } from "./entity/ticket.entity";
import { CreateTicketPayload } from "./payload/create-ticket.payload";
import { UpdateTicketPayload } from "./payload/update-ticket.payload";
import { TicketRepository } from "./repository/ticket.repository";


@Injectable()
export class TicketService {
    constructor(
        private readonly ticketRepository: TicketRepository
    ) {}

    async getAll(): Promise<Ticket[]> {
        try {
            // Get query
            return this.ticketRepository.find();

        } catch (err) {
            throw err;
        }
    }

    async create(data: CreateTicketPayload): Promise<Ticket> {
        try {
            // Insert query
            const newTicket = await this.ticketRepository.create(data);
            return this.ticketRepository.save(newTicket);

        } catch (err) {
            throw err;
        }
    }

    async update(id: number, data: UpdateTicketPayload) {
        try {
            // Check if ticket exist
            const ticketCheck = await this.ticketRepository.checkIfTicketExists(id);
            if (!ticketCheck) throw new NotFoundException('Ticket is not found');
            
            // Update query
            await this.ticketRepository.update(id, data);
            
        } catch (err) {
            throw err;
        }
    }

    async remove(id: number) {
        try {
            // Check if ticket exist
            const ticketCheck = await this.ticketRepository.checkIfTicketExists(id);
            if (!ticketCheck) throw new NotFoundException('Ticket is not found');
            
            // Update query
            await this.ticketRepository.delete(id);
            
        } catch (err) {
            throw err;
        }
    }
}