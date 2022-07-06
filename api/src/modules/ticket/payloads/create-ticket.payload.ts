import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { TicketStatus } from "../enums/ticket-status.enum";
import { TicketType } from "../enums/ticket-type.enum";

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

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ticketType: string = TicketType.SHORT_TERM;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ticketStatus: string = TicketStatus.PENDING;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    recipientId: number;

    authorId: number;
}