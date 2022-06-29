import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class CreateTicketTypeDto {
    @ApiProperty()
    @IsString()
    @IsDefined()
    name: string;
}