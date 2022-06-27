import { Type } from "class-transformer";
import { IsOptional, IsInt, IsString } from "class-validator";

export class SearchQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number = 10;


  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsString()
  @Type(() => String)
  textSearch?: Date;
}