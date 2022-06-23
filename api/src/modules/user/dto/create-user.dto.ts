import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @Length(6, 50, { message: 'Password must be between 6-50 characters'})
    password: string;

    @ApiProperty()
    @Length(1, 50)
    firstName: string;

    @ApiProperty()
    @Length(1, 50)
    lastName: string;

    // @ApiProperty()
    // gender: boolean;

}