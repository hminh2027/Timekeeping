import { ApiPropertyOptional } from "@nestjs/swagger";

export class SearchQueryDto {
  @ApiPropertyOptional({ type: Date })
  fromDate: Date;

  @ApiPropertyOptional({ type: Date })
  toDate: Date;
}