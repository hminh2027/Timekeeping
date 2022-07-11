import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CheckinoutPayload {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/(data:image\/[^;]+;base64.*?)/, {
    message: `Image must be base64 encoded format.`,
  })
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
