import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'School objects' })
  @IsOptional() @IsString() @IsNotEmpty() @MaxLength(100) name?: string;
  @ApiPropertyOptional({ example: 'Đồ dùng học tập' })
  @IsOptional() @IsString() @MaxLength(500) description?: string;
}
