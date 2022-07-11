import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenQueryDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  token!: string;
}
