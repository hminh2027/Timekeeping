import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTicketTypeDto } from "./dto/create-ticket-type.dto";
import { UpdateTicketTypeDto } from "./dto/update-ticket-type.dto";
import { TicketType } from "./ticket-type.entity";


@Injectable()
export class TicketTypeService {
    constructor(
        @InjectRepository(TicketType)
        private readonly ticketTypeRepository: Repository<TicketType>
        // private readonly ticketRepository: Repository<Ticket> = getCustomRepository(TicketRepository)
    ) {}

    async getAll(): Promise<TicketType[]> {
        try {
            // Get query
            return this.ticketTypeRepository.find();

        } catch (err) {
            throw err;
        }
    }

    async create(data: CreateTicketTypeDto): Promise<TicketType> {
        try {
            // Insert query
            const newTicket = await this.ticketTypeRepository.create(data);
            return this.ticketTypeRepository.save(newTicket);

        } catch (err) {
            throw err;
        }
    }

    async update(id: number, data: UpdateTicketTypeDto) {
        try {
            // Check if ticket exist
            const ticketCheck = await this.ticketTypeRepository.findOne({where: {id}});
            // const ticketCheck = await getCustomRepository(ticketTypeRepository).checkIfTicketExists(id);
            if (!ticketCheck) throw new NotFoundException('Ticket is not found');
            
            // Update query
            await this.ticketTypeRepository.update(id, data);
            
        } catch (err) {
            throw err;
        }
    }

    async remove(id: number) {
        try {
            // Check if ticket exist
            const ticketCheck = await this.ticketTypeRepository.findOne({where: {id}});
            // const ticketCheck = await getCustomRepository(ticketTypeRepository).checkIfTicketExists(id);
            if (!ticketCheck) throw new NotFoundException('Ticket is not found');
            
            // Update query
            await this.ticketTypeRepository.delete(id);
            
        } catch (err) {
            throw err;
        }
    }
}