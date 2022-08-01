import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class TokenQueryDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsJWT()
  token!: string;
}
