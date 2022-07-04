import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, ValidationPipe, Request, Query, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserRole } from '../role/role.enum';
import { CheckinPayload } from './payloads/checkin.payload';
import { CheckinService } from './checkin.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { SearchQueryDto } from './dto/search.dto';

export const storage = {
  storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) => {
          const filename: string = file.originalname;
          cb(null, `${filename}`)
      }
  })
}

@Controller('checkin')
@ApiTags('check in')
@ApiBearerAuth()
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)

export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Get successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getCheckin(@Request() req, @Query() data: SearchQueryDto) {
    return await this.checkinService.search(req.user.id, data);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Get successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UseInterceptors(FileInterceptor('image', storage))
  async createCheckin(@UploadedFile() file, @Request() req, @Body() data: CheckinPayload) {
    data.userId = Number(req.user.id);
    data.image = file.originalname;
    return await this.checkinService.create(data);
  }


}
