import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPayload {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password2!: string;
}
