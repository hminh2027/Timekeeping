import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginPayload {
  @ApiProperty({ required: true, default: 'test@gmail.com'})
  @IsEmail()
  email!: string;

  @ApiProperty({ required: true, default: '123456' })
  @IsNotEmpty()
  @MinLength(5)
  password!: string;
}
