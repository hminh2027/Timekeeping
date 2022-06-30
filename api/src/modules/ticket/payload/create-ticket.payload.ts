import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateTicketPayload {
    @ApiProperty({ type: Date, default: new Date() })
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ type: Date, default: new Date() })
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

    @ApiProperty({ type: Number })
    // @IsNumber()
    @IsNotEmpty()
    ticketTypeId: number;

    @ApiProperty({ type: Number })
    // @IsNumber() bug here
    @IsNotEmpty()
    recipientId: number;

    // @IsNumber() bug here
    authorId: number;
}