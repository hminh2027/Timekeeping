import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { LocalAuthGuard } from "src/common/guards/local-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { UserRole } from "../role/role.enum";
import { AuthService } from "./auth.service";

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    // Route for testing protected
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('protected')
    protected(@Request() req): any {
        return 'Can access';
    }
}