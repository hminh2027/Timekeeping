import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchQueryDto {
  @ApiPropertyOptional({
    type: Number,
    default: 10,
  })
  limit?: number = 10;

  @ApiPropertyOptional({
    type: Number,
    default: 1,
  })
  page?: number = 1;

  @ApiPropertyOptional({
    type: String,
  })
  textSearch?: string;
}
