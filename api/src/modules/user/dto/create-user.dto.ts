import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @Length(8, 50, { message: 'Password must be between 8-50 characters'})
    password: string;

    @ApiProperty()
    @Length(1, 50)
    firstName: string;

    @ApiProperty()
    @Length(1, 50)
    lastName: string;

    @ApiProperty()
    gender: boolean;

    @ApiProperty()
    @Length(0, 50)
    birth: string;

    @ApiProperty()
    @Length(0, 20)
    phone: string;

    @ApiProperty()
    @Length(0, 50)
    skype: string;

    @ApiProperty()
    @Length(0, 100)
    address: string;

    @ApiProperty()
    @Length(0, 50)
    avatar: string;
}