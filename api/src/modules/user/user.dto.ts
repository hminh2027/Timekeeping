import { IsEmail, Length } from "class-validator";

export class UserDto {
    @IsEmail()
    email: string;

    @Length(8, 50)
    password: string;

    @Length(1, 50)
    firstName: string;

    @Length(1, 50)
    lastName: string;

    gender: boolean;

    @Length(0, 50)
    birth: string;

    @Length(0, 20)
    phone: string;

    @Length(0, 50)
    skype?: string;

    @Length(0, 100)
    address: string;

    @Length(0, 50)
    avatar: string;
}