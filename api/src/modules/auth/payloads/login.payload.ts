import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginPayload {
  @ApiProperty({ required: true, default: 'test@vdtsol.com' })
  @IsEmail()
  @Matches(/^[\w-\.]+@(vdtsol\.)+[\w-]{2,4}$/, {
    message: `Email domain must be vdtsol`,
  })
  email!: string;

  @ApiProperty({ required: true, default: '123456' })
  @IsNotEmpty()
  @MinLength(5)
  password!: string;
}
