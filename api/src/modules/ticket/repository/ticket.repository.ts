import { EntityRepository, Repository } from "typeorm";
import { Ticket } from "../ticket.entity";

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {

    public async checkIfTicketExists(id: number): Promise<boolean> {
        const count = await this.createQueryBuilder('ticket')
        .where('ticket.id = :id', { id })
        .getCount();

        return count > 0;
    }   
}