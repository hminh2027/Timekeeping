import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { UserRole } from 'src/modules/user/enums/role.enum';

export class RegisterPayload {
  @ApiProperty({ default: 'test@vdtsol.com' })
  @IsEmail()
  @Matches(/^[\w-\.]+@(vdtsol\.)+[\w-]{2,4}$/, {
    message: `email domain must be vdtsol`,
  })
  email!: string;

  @ApiProperty({ default: 'John' })
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ default: 'Wick' })
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ default: 'Vcheck1@' })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: `password must contains at least 8 characters, including at least 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character.`,
    },
  )
  password!: string;

  @IsNotEmpty()
  role: UserRole = UserRole.USER;

  resetToken: string = '';
}
