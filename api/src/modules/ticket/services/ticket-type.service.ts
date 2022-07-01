import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTicketTypePayload } from "../payloads/create-ticket-type.payload";
import { UpdateTicketTypePayload } from "../payloads/update-ticket-type.payload";
import { TicketTypeRepository } from "../repositories/ticket-type.repository";
import { TicketType } from "../entities/ticket-type.entity";


@Injectable()
export class TicketTypeService {
    constructor(
        private readonly ticketTypeRepository: TicketTypeRepository
    ) {}

    async getAll(): Promise<TicketType[]> {
        try {
            // Get query
            return this.ticketTypeRepository.find();

        } catch (err) {
            throw err;
        }
    }

    async create(data: CreateTicketTypePayload): Promise<TicketType> {
        try {
            // Insert query
            const newTicket = await this.ticketTypeRepository.create(data);
            return this.ticketTypeRepository.save(newTicket);

        } catch (err) {
            throw err;
        }
    }

    async update(id: number, data: UpdateTicketTypePayload) {
        try {
            // Check if ticket type exist
            const ticketCheck = await this.ticketTypeRepository.checkTicketTypeExistance(id);
            if (!ticketCheck) throw new NotFoundException('Ticket type is not found');
            
            // Update query
            await this.ticketTypeRepository.update(id, data);
            
        } catch (err) {
            throw err;
        }
    }

    async remove(id: number) {
        try {
            // Check if ticket type exist
            const ticketCheck = await this.ticketTypeRepository.checkTicketTypeExistance(id);
            if (!ticketCheck) throw new NotFoundException('Ticket is not found');
            
            // Update query
            await this.ticketTypeRepository.delete(id);
            
        } catch (err) {
            throw err;
        }
    }
}