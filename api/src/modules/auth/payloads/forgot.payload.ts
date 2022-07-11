import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class ForgotPayload {
  @ApiProperty({ required: true, default: 'test@vdtsol.com'})
  @IsEmail()
  @Matches(/^[\w-\.]+@(vdtsol\.)+[\w-]{2,4}$/, { message: `Email domain must be vdtsol` })
  email!: string;
}
