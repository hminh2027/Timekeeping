import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPayload {
  @ApiProperty({ required: true, default: 'test@vdtsol.com' })
  @IsEmail()
  email!: string;
}
