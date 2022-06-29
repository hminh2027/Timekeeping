import { EntityRepository, Repository } from "typeorm";
import { TicketType } from "../ticket-type.entity";

@EntityRepository(TicketType)
export class TicketTypeRepository extends Repository<TicketType> {

    public async checkIfTicketExists(id: number): Promise<boolean> {
        const count = await this.createQueryBuilder('ticket_type')
        .where('ticket_type.id = :id', { id })
        .getCount();

        return count > 0;
    }   
}