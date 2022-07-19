import { ApiPropertyOptional } from '@nestjs/swagger';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketType } from '../enums/ticket-type.enum';

export class SearchQueryDto {
  @ApiPropertyOptional({
    type: Number,
    default: 10,
  })
  limit?: number = 10;

  @ApiPropertyOptional({
    type: Number,
    default: 1,
  })
  page?: number = 1;

  @ApiPropertyOptional({
    type: String,
    default: ' ',
  })
  textSearch?: string;

  @ApiPropertyOptional({
    type: String,
    default: TicketType.LONG_TERM,
  })
  ticketType?: string;

  @ApiPropertyOptional({
    type: String,
    default: TicketStatus.PENDING,
  })
  ticketStatus?: string;

  @ApiPropertyOptional({
    type: String,
    default: 'createdAt',
  })
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    type: Boolean,
    default: true,
  })
  orderBy?: string = 'true';
}
