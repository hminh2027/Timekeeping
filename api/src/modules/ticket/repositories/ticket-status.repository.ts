import { EntityRepository } from "src/common/typeorm/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { TicketStatus } from "../entities/ticket-status.entity";

@EntityRepository(TicketStatus)
export class TicketStatusRepository extends Repository<TicketStatus> {

    public async checkTicketStatusExistance(id: number): Promise<boolean> {
        const count = await this.createQueryBuilder('ticket_status')
        .where('ticket_status.id = :id', { id })
        .getCount();

        return count > 0;
    }   
}