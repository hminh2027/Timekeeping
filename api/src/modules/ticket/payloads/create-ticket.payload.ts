import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketType } from '../enums/ticket-type.enum';

export class CreateTicketPayload {
  @ApiProperty({ type: Date })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ type: Date })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ enum: TicketType })
  @IsEnum(TicketType)
  @IsNotEmpty()
  ticketType: TicketType;

  @IsEnum(TicketStatus)
  @IsNotEmpty()
  ticketStatus: TicketStatus = TicketStatus.PENDING;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  recipientId: number;

  authorId: number;
}
