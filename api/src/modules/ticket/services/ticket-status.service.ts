import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTicketTypePayload } from "../payloads/create-ticket-type.payload";
import { UpdateTicketTypePayload } from "../payloads/update-ticket-type.payload";
import { TicketType } from "../entities/ticket-type.entity";
import { TicketStatusRepository } from "../repositories/ticket-status.repository";


@Injectable()
export class TicketStatusService {
    constructor(
        private readonly ticketStatusRepository: TicketStatusRepository
    ) {}

    async getAll(): Promise<TicketType[]> {
        try {
            // Get query
            return this.ticketStatusRepository.find();

        } catch (err) {
            throw err;
        }
    }

    async create(data: CreateTicketTypePayload): Promise<TicketType> {
        try {
            // Insert query
            const newTicket = await this.ticketStatusRepository.create(data);
            return this.ticketStatusRepository.save(newTicket);

        } catch (err) {
            throw err;
        }
    }

    async update(id: number, data: UpdateTicketTypePayload) {
        try {
            // Check if ticket type exist
            const ticketCheck = await this.ticketStatusRepository.checkTicketStatusExistance(id);
            if (!ticketCheck) throw new NotFoundException('Ticket status is not found');
            
            // Update query
            await this.ticketStatusRepository.update(id, data);
            
        } catch (err) {
            throw err;
        }
    }

    async remove(id: number) {
        try {
            // Check if ticket type exist
            const ticketCheck = await this.ticketStatusRepository.checkTicketStatusExistance(id);
            if (!ticketCheck) throw new NotFoundException('Ticket status is not found');
            
            // Update query
            await this.ticketStatusRepository.delete(id);
            
        } catch (err) {
            throw err;
        }
    }
}