import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class ResetPayload {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: `password must contains at least 8 characters, including at least 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character.`,
    },
  )
  password!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password2!: string;
}
