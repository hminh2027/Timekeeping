import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsDefined()
    email: string;

    @ApiProperty()
    @Length(6, 50, { message: 'Password must be between 6-50 characters'})
    @IsString()
    @IsDefined()
    password: string;

    @ApiProperty()
    @Length(1, 50)
    @IsString()
    @IsDefined()
    firstName: string;

    @ApiProperty()
    @Length(1, 50)
    @IsString()
    @IsDefined()
    lastName: string;

    // @ApiProperty()
    // gender: boolean;

    // @ApiProperty()
    // @IsNumber()
    // @IsDefined()
    // role: number
}