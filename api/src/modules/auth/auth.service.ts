import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if(!user) throw new HttpException('Wrong username or password', HttpStatus.UNAUTHORIZED);
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch) throw new HttpException('Wrong username or password', HttpStatus.UNAUTHORIZED);
        return user;
    }
    
    async login(user: any) {
        const payload = { name: user.email }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}