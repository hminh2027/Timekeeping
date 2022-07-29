import { Repository } from 'typeorm';
import { EntityRepository } from 'src/common/typeorm/typeorm-ex.decorator';
import { Ticket } from '../entities/ticket.entity';
import { SearchQueryDto } from '../dto/search.dto';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  public async checkTicketExistance(id: number): Promise<boolean> {
    const count = await this.createQueryBuilder('tickets')
      .where('tickets.id = :id', { id })
      .getCount();

    return count > 0;
  }

  public async paginationAndSearch(params: SearchQueryDto) {
    const offset = (params.page - 1) * params.limit;
    return this.createQueryBuilder('tickets')
      .where('tickets.title like :title', {
        title: `%${params.search || ''}%`,
      })

      .andWhere(
        params.ticketType ? 'tickets.ticketType = :ticketType' : '1=1',
        {
          ticketType: params.ticketType,
        },
      )
      .andWhere(
        params.ticketStatus ? 'tickets.ticketStatus = :ticketStatus' : '1=1',
        {
          ticketStatus: params.ticketStatus,
        },
      )
      .orderBy(
        `tickets.${params.sortField}`,
        params.sortType === 'true' ? 'ASC' : 'DESC',
      )
      .skip(offset)
      .take(params.limit);
  }
}
