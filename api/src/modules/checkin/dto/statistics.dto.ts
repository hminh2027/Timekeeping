import { ApiPropertyOptional } from '@nestjs/swagger';

export class StatisticsQueryDto {
  @ApiPropertyOptional({ type: Number })
  range: number;
}
