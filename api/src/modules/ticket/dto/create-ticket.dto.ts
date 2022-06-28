import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDefined, IsNumber, IsString, Length } from "class-validator";

export class CreateTicketDto {
    @ApiProperty()
    @IsDateString()
    @IsDefined()
    startDate: Date;

    @ApiProperty()
    @IsDateString()
    @IsDefined()
    endDate: Date;

    @ApiProperty()
    @IsString()
    @Length(1, 50)
    @IsDefined()
    title: string;

    @ApiProperty()
    @IsString()
    @IsDefined()
    content: string;

    @ApiProperty()
    // @IsNumber() bug here
    @IsDefined()
    recipientId: number;

    @ApiProperty()
    // @IsNumber() bug here
    authorId: number;
}