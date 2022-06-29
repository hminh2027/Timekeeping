import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getCustomRepository, Repository } from "typeorm";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { TicketRepository } from "./repository/ticket.repository";
import { Ticket } from "./ticket.entity";


@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>
        // private readonly ticketRepository: Repository<Ticket> = getCustomRepository(TicketRepository)
    ) {}

    async getAll(): Promise<Ticket[]> {
        try {
            // Get query
            return this.ticketRepository.find();

        } catch (err) {
            throw err;
        }
    }

    async create(data: CreateTicketDto): Promise<Ticket> {
        try {
            // Insert query
            const newTicket = await this.ticketRepository.create(data);
            return this.ticketRepository.save(newTicket);

        } catch (err) {
            throw err;
        }
    }

    async update(id: number, data: UpdateTicketDto) {
        try {
            // Check if ticket exist
            const ticketCheck = await getCustomRepository(TicketRepository).checkIfTicketExists(id);
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
            const ticketCheck = await getCustomRepository(TicketRepository).checkIfTicketExists(id);
            if (!ticketCheck) throw new NotFoundException('Ticket is not found');
            
            // Update query
            await this.ticketRepository.delete(id);
            
        } catch (err) {
            throw err;
        }
    }
}