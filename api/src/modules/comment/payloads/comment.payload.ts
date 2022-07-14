import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CommentPayload {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  ticketId: number;

  userId: number;
}
