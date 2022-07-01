import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

const EMAIL_DOMAIN = 'vdtsol';

export class RegisterPayload {
  @ApiProperty({ required: true })
  @IsEmail()
  @Matches(/^[\w-\.]+@(vdtsol\.)+[\w-]{2,4}$/, { message: `Email domain must be vdtsol` })
  email!: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(5)
  password!: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  roleId!: number;
}
