import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CheckinoutPayload {
  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  longitude: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  latitude: string;

  userId: number;
}