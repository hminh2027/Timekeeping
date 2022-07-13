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

  @ApiProperty({ default: '105.30304757837501' })
  @IsString()
  @IsNotEmpty()
  longitude: string;

  @ApiProperty({ default: '10.000207145497916' })
  @IsString()
  @IsNotEmpty()
  latitude: string;

  userId: number;
}
