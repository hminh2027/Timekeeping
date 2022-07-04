import { ApiPropertyOptional } from "@nestjs/swagger";

export class SearchQueryDto {
  @ApiPropertyOptional({ 
    type: Date,
    default: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
  })
  fromDate?: Date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());

  @ApiPropertyOptional({ 
    type: Date,
    default: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
  })
  toDate?: Date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
}