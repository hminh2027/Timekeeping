import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTicketTypePayload {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}