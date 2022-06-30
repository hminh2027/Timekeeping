import { Repository } from "typeorm";
import { EntityRepository } from "src/common/typeorm/typeorm-ex.decorator";
import { Ticket } from "../entity/ticket.entity";

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {

    public async checkIfTicketExists(id: number): Promise<boolean> {
        const count = await this.createQueryBuilder('tickets')
        .where('tickets.id = :id', { id })
        .getCount();

        return count > 0;
    }   
}