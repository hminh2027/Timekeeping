import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  address: string;

  @IsString()
  skype: string;

  @IsString()
  facebook: string;

  @IsString()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
