import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { LocalAuthGuard } from "src/common/guards/local-auth.guard";
import { AuthService } from "./auth.service";

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        console.log(req.user)
        return this.authService.login(req.user);
    }

    // Route for testing protected
    @UseGuards(JwtAuthGuard)
    @Get('protected')
    protected(@Request() req): any {
        return req.user;
    }
}