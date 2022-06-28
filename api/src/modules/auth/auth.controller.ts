import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "src/common/guards/local-auth.guard";
import { AuthService } from "./auth.service";

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /* POST request to login
    @Guard: local authentication
    @Body: user's data
    */
    @UseGuards(LocalAuthGuard)   
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}