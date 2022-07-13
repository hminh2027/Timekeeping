import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginPayload {
  @ApiProperty({ required: true, default: 'test@vdtsol.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ required: true, default: 'Vcheck1@' })
  @IsNotEmpty()
  password!: string;
}
