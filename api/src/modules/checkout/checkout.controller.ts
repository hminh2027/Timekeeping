import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, ValidationPipe, Request, Query, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserRole } from '../role/role.enum';
import { CheckoutPayload } from './payloads/checkout.payload';
import { CheckoutService } from './checkout.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchQueryDto } from '../checkin/dto/search.dto';

export const storage = {
  storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) => {
          const filename: string = file.originalname;
          cb(null, `${filename}`)
      }
  })
}

@Controller('checkout')
@ApiTags('check out')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)

export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Get successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getCheckout(@Request() req, @Query() data: SearchQueryDto) {
    return await this.checkoutService.search(req.user.id, data);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Get successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UseInterceptors(FileInterceptor('image', storage))
  async createCheckout(@UploadedFile() file, @Request() req, @Body() data: CheckoutPayload) {
    data.userId = Number(req.user.id);
    data.image = file.originalname;
    return await this.checkoutService.create(data);
  }


}
