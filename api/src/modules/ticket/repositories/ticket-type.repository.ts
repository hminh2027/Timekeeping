import { EntityRepository } from "src/common/typeorm/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { TicketType } from "../entities/ticket-type.entity";

@EntityRepository(TicketType)
export class TicketTypeRepository extends Repository<TicketType> {

    public async checkTicketTypeExistance(id: number): Promise<boolean> {
        const count = await this.createQueryBuilder('ticket_types')
        .where('ticket_types.id = :id', { id })
        .getCount();

        return count > 0;
    }   
}