import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if(!user) throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch) throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
        return user;
    }
    
    async login(user: any) {
        const { password, createdAt, modifiedAt, isDeleted, ...rest} = user;
        const payload = { ...rest }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}