import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { UserRole } from 'src/modules/user/enums/role.enum';

export class RegisterPayload {
  @ApiProperty({ default: 'test@vdtsol.com' })
  @IsEmail()
  @Matches(/^[\w-\.]+@(vdtsol\.)+[\w-]{2,4}$/, {
    message: `Email domain must be vdtsol`,
  })
  email!: string;

  @ApiProperty({ default: 'John' })
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ default: 'Wick' })
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ default: '12345678' })
  @IsNotEmpty()
  @MinLength(8)
  // viet regex password theo requirements
  password!: string;

  @IsNotEmpty()
  role: string = UserRole.USER;

  resetToken: string = '';
}
